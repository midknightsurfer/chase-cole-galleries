from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import NewOrder
from app.models import db, Product, Order, OrderProduct


order_routes = Blueprint("orders", __name__)


@order_routes.route("/<int:userId>")
def all_orders(userId):
    orders = Order.query.filter(Order.user_id == userId)

    return {"orders": [order.to_dict() for order in orders]}


@order_routes.route("", methods=["POST"])
@login_required
def new_order():
    req = request.json["data"]
    order = Order(user_id=req["user_id"], status=req["status"], total=req["total"])

    db.session.add(order)
    db.session.commit()

    for product in req["products"]:

        order_product = OrderProduct(
            order_id=order.id,
            product_id=product["product"]["id"],
            product_title=product["product"]["title"],
            product_image=product["product"]["images"],       
        )
        db.session.add(order_product) 
    db.session.commit()

    return order.to_dict()

@order_routes.route('/<int:order_id>', methods=["PUT"])
def edit_status(order_id):
    order = Order.query.get(order_id)
    req = request.json

    order.status = req['status']

    db.session.add(order)
    db.session.commit()
    return order.to_dict()

@order_routes.route("/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    print("print--------------", order_id)
    order = Order.query.get(order_id)
    print("print--------------", order)
    order_deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()
    return order_deleted
