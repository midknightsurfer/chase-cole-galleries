from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Cart

cart_routes = Blueprint('carts', __name__)



@cart_routes.route('/<int:userId>')
def my_cart(userId):
  cart_items = Cart.query.filter(Cart.user_id == userId)
  return {"cart_items": [cart_item.to_dict() for cart_item in cart_items ]}

@cart_routes.route('/', methods=["POST"])
def add_to_cart():

    req = request.json['data']

    new_cart_item = Cart(
        user_id=req["user_id"],
        product_id=req["id"],
    )
    db.session.add(new_cart_item)
    db.session.commit()
    
    return new_cart_item.to_dict()
  
@cart_routes.route('/<int:cartUserId>', methods=["DELETE"])
def clear_cart(cartUserId):
    cart_product = Cart.query.filter(Cart.user_id == cartUserId).all()

    for product in cart_product:
        db.session.delete(product)

    db.session.commit()
    return {"message":"deleted cart"}

@cart_routes.route('/<int:cartUserId>/<int:productId>', methods=["DELETE"])
def delete_product(productId, cartUserId):

    cart_product = Cart.query.filter(Cart.product_id == productId and Cart.user_id == cartUserId).first()
    deleted_cart_product = cart_product.to_dict()
    db.session.delete(cart_product)
    db.session.commit()
    return deleted_cart_product

