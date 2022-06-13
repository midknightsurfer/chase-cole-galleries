from .db import db

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    
    product = db.relationship("Product", back_populates="category", cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
        
    def category_info(self):
        return self.id