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

