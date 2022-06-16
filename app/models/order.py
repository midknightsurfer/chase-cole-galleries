from .db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False) # user foreign key
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    products = db.relationship('OrderProduct', back_populates='order', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "status": self.status,
            "created_at": self.created_at,
            "products" : [product.to_dict() for product in self.products],
        }
        
        
    # def product_info(self):
    #     return {
    #     "id": self.id,
    #     "user_id": self.user_id,
    #     "title": self.product.booking_info(),
    #     "description": self.product.booking_info(),
    #     "shipping_price": self.product.booking_info(),
    #     "images": [image.image_info() for image in self.images],
    # }

