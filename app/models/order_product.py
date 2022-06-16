from .db import db


class OrderProduct(db.Model):
    __tablename__ = "order_products"

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
    product_title = db.Column(db.String, nullable=False)
    product_image = db.Column(db.String, nullable=False)
    # relationships

    order = db.relationship("Order", back_populates="products")
    product = db.relationship("Product", back_populates="item")

    def to_dict(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "product_id": self.product_id,
            "product_title": self.product_title,
            "product_image": self.product_image,
            "product": self.product.to_dict(),
        }
