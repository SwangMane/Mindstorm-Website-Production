from flask import Blueprint, jsonify, request, render_template
import requests
from flask_login import login_manager, login_required, current_user
from .models import User
from . import db

views = Blueprint("views", __name__)


# -------------------------
#
# Health Check | initial check to see if server is online
#
# -------------------------
@views.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "online"})


# -------------------------
#
# Home Route
#
# -------------------------
@views.route("/api/", methods=["GET"]) 
def home():
    return jsonify({"message": "API running"})


# -------------------------
#
# login check route
#
# -------------------------
@views.route("/api/userstatus", methods=["GET"])
def userstatus():
    # if the current user is logged in | cookies
    if current_user.is_authenticated:
        return jsonify({
            "logged_in": True,
            "user": current_user.user_name
        }), 200

    # if they are not logged in
    return jsonify({
        "logged_in": False
    }), 200


#-------------------------
#
#   User information filler
#
#-------------------------
@views.route("/api/userinfo", methods=["GET"])
def userinfo():

    if current_user.is_authenticated:

        return jsonify({
            "message": "success",
            "user": current_user.to_dict()
        }), 200

    return jsonify({
        "error": "Unauthorized",
        "code": "UNAUTHORIZED"
    }), 401


#-------------------------
#
#   grab all current users
#
#-------------------------
@views.route('/api/usernames', methods=['GET'])
def get_usernames():
    usernames = [user.user_name for user in User.query.all()]
    return jsonify(usernames)



#-------------------------
#
#   User playstyle saver
#
#-------------------------
@views.route("/api/save-playstyle", methods=["POST"])
def save_playstyle():

    if not current_user.is_authenticated:
        return jsonify({
            "error": "Unauthorized"
        }), 401

    data = request.get_json()

    playstyle = data.get("playstyle")

    if playstyle is None:
        return jsonify({
            "error": "Missing playstyle"
        }), 400

    current_user.user_playstyle = playstyle

    db.session.commit()

    return jsonify({
        "success": True,
        "playstyle": current_user.user_playstyle
    }), 200


# -------------------------
#
# Minecraft Profile Lookup
#
# -------------------------
@views.route("/api/mcprofile/<username>", methods=["GET"])
def mcprofile(username):
    

    user_exists = User.query.filter_by(user_name=username).first()


    if user_exists:
        return jsonify({
            "source": "database",
            "message": "User exists in local database",
            "name": username
        }), 200



    url = (
        "https://api.minecraftservices.com/"
        f"minecraft/profile/lookup/name/{username}"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Player not found"}), 404

    return jsonify(response.json())


# -------------------------
#
# Debugger
#
# -------------------------
@views.route("/api/debug")
def debug():
    return {
        "auth": current_user.is_authenticated,
        "cookies": dict(request.cookies)
    }