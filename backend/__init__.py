from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import path
from flask_login import LoginManager
from flask_migrate import Migrate
from datetime import timedelta

# initialize the database system
db = SQLAlchemy()
migrate = Migrate()

DB_NAME = "database.db"

# create the flask app
def create_app():
    app = Flask(__name__)

    # all configs for app
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{DB_NAME}"

    app.config['SECRET_KEY'] = 'asdasda asdasds'

    app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_PERMANENT"] = True
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)

    # init extenstions
    db.init_app(app)


    # cors app
    CORS(
        app,
        supports_credentials=True,
        origins=["http://localhost:3000", "https://mindstormgames.com"],
        allow_headers=["Content-Type"],
        methods=["GET", "POST", "OPTIONS"]
    )

    # blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views)
    app.register_blueprint(auth)

    # all models | database, etc
    from .models import User

    # how to setup the database
    create_database(app)

    # add login manager 
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

# function to create a database if one is not created
def create_database(app):
    if not path.exists(DB_NAME):
        with app.app_context():
            db.create_all()
        print("Created Database!")