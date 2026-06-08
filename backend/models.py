from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

# database structure
class User(db.Model, UserMixin):
  #users id
  id = db.Column(db.Integer, primary_key=True)
  #users email    
  email = db.Column(db.String(150), unique=True)
  #users password
  password = db.Column(db.String(150))
  #users username
  user_name = db.Column(db.String(150))
  #users profile picture
  user_profilePicture = db.Column(db.String(255))

  #users role
  user_role = db.Column(db.String(150), default="Standard User")
  #users joindate
  user_joinDate = db.Column(db.String(150))
  #users server points
  user_serverPoints = db.Column(db.Integer, default=0)
  #users playstyle
  user_playstyle = db.Column(db.String(150), default=None)

  def to_dict(self):
    return {
      "id": self.id,
      "email": self.email,
      "user_name": self.user_name,
      "user_profilePicture": self.user_profilePicture, 

      "user_role": self.user_role,
      "user_joinDate": self.user_joinDate,
      "user_serverPoints": self.user_serverPoints,
      "user_playstyle": self.user_playstyle,
    }
