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
    sold = db.Column(db.Boolean, default=False)
    shipping_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    images = db.relationship("Image", back_populates="product", cascade="all, delete")
    
    category = db.relationship("Category", back_populates="product")
    
    product_cart = db.relationship("Cart", back_populates="product" )
    
    item = db.relationship('OrderProduct', back_populates='product', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "category_id": self.category.category_info(),
            "price": self.price,
            "sold": self.sold,
            "shipping_price": self.shipping_price,
            "images": [image.image_info() for image in self.images],
            "created_at": self.created_at,
        }
        
    
    # def product_info(self):
    #     return {
    #     "id": self.id,
    #     "user_id": self.user_id,
    #     "title": self.title,
    #     "description": self.description,
    #     "shipping_price": self.shipping_price,
    #     "images": [image.image_info() for image in self.images],
    # }
