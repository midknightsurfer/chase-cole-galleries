from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(20))
    zipcode = db.Column(db.Integer)
    phone = db.Column(db.String(20))   
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.String(255))
    admin = db.Column(db.Boolean)
    
    cart = db.relationship("Cart", back_populates="user")
    favorites = db.relationship("Favorite", back_populates="user") 

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "avatar": self.avatar,
            "admin": self.admin,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zipcode": self.zipcode,
        }
