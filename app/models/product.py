from .db import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) # user foreign key
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    price = db.Column(db.Float, nullable=False)
    shipping_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    images = db.relationship("Image", back_populates="product", cascade="all, delete")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "shipping_price": self.shipping_price,
            "images": [image.image_info() for image in self.images],
            "created_at": self.created_at,
        }
