from .db import db
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship("User", back_populates="favorites")
    product = db.relationship("Product", back_populates="favorites")

    def to_dict(self):
            return {
                "id": self.id,
                "user_id": self.user_id,
                "product_id": self.product_id,
                "created_at": self.created_at,
                "updated_at": self.updated_at
            }