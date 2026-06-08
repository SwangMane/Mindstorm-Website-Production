from flask import Blueprint, request, jsonify, session
from flask_cors import cross_origin
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
from datetime import datetime

auth = Blueprint('auth', __name__)

# -------------------------
#
# Create account route
#
# -------------------------
@auth.route("/api/createAccount", methods=["POST"])
@cross_origin()
def create_account():

    # grab the posted data from the fetch
    data = request.get_json()

    # if the data provided is bad
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400


    # Minecraft username
    username = data.get("minecraft_username")
    # users email
    email = data.get("email")
    # users password
    password = data.get("password")

    user_profilePicture = data.get("user_profilePicture")

    #check if the username or email already exists in the database
    user = User.query.filter_by(email=email).first()
    usernameExists = User.query.filter_by(user_name=username).first()

    # error cehcks
    if user or usernameExists:
        return jsonify({"error": "This email already exists"}), 400

    elif not username:
        return jsonify({"error": "Missing username"}), 400

    elif not email:
        return jsonify({"error": "Missing email"}), 400

    elif not password:
        return jsonify({"error": "Missing password"}), 400

    elif not user_profilePicture:
        return jsonify({"error": "Missing prfile picture"}), 400

    # if all errors passed, create the users account
    else:
        
        userRole = "Standard User"

        owners = [
            "DARKminerKS",
            "Blockk",
            "HillbillyDeluex",
            "Syrmaa_"
        ]

        moderators = [
            "theJman12"
        ]

        if username in owners:
            userRole = "Owner"

        elif username in moderators:
            userRole = "Moderator"

            
        
        join_date = datetime.now()
        formatted = join_date.strftime("%Y-%m-%d %H:%M:%S")

        new_user = User(email=email, password=generate_password_hash(password, method="pbkdf2:sha256"), user_name=username, user_joinDate=formatted, user_profilePicture=user_profilePicture, user_role=userRole)

        db.session.add(new_user)

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Account created"
        })


# -------------------------
#
# Login account route
#
# -------------------------
@auth.route("/api/login", methods=["POST"])
def login():

    #grab the info from the fetch
    try:
        data = request.get_json()

        #if data return is null
        if not data:
            return jsonify({
                "success": False,
                "message": "No JSON provided"
            }), 400

        # users provided email and password
        email = data.get('email')
        password = data.get('password')

        # if the email or password is missing in the fetch
        if not email or not password:
          return jsonify({
              "success": False,
              "code": "MISSING_CREDENTIALS",
              "message": "Missing credentials"
          }), 400

        #check the database for the first instance of provided email
        user = User.query.filter_by(email=email).first()

        # if the email doesnt exist
        if not user:
            return jsonify({
                "success": False,
                "message": "Email does not exist"
            }), 404
        
        # if the user is somehow missing a password
        if not user.password:
          return jsonify({
              "success": False,
              "message": "Password not set"
          }), 500

        # check provided password against database password | fail
        if not check_password_hash(user.password, password):
            return jsonify({
                "success": False,
                "code": "INVALID_CREDENTIALS",
                "message": "Invalid email or password"
            }), 401

        login_user(user, remember=False)
        session.permanent = True

        return jsonify({
            "success": True,
            "message": "Login successful"
        }), 200

    # exception error catcher
    except Exception as e:
        return jsonify({
            "success": False,
            "message": "Server error",
            "error": str(e)
        }), 500


# -------------------------
#
# Logout account route
#
# -------------------------
@auth.route("/api/logout", methods=["POST"])
@login_required
def logout():
    
    logout_user()
    return jsonify({
       "success": True,
       "message": "User log out complete"
    })
