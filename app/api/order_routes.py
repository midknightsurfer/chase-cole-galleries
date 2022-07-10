from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Order, OrderProduct


order_routes = Blueprint("orders", __name__)


@order_routes.route("/<int:userId>")
def all_orders(userId):
    orders = Order.query.filter(Order.user_id == userId)

    return {"orders": [order.to_dict() for order in orders]}

@order_routes.route("/sold/<int:userId>")
def all_sold(userId):
    orders = OrderProduct.query.filter(OrderProduct.user_id == userId)

    return {"orders": [order.to_dict() for order in orders]}

@order_routes.route("", methods=["POST"])
@login_required
def new_order():
    req = request.json["data"]
    order = Order(user_id=req["user_id"], total=req["total"])

    db.session.add(order)
    db.session.commit()

    for product in req["products"]:

        order_product = OrderProduct(
            order_id=order.id,
            user_id=product["product"]["user_id"],
            buyer_id=req["user_id"],
            product_id=product["product"]["id"],
            product_title=product["product"]["title"],
            product_image=product["product"]["images"],
            status=req["status"]
        )
        db.session.add(order_product)
    db.session.commit()

    return order.to_dict()


@order_routes.route("/<int:product_id>", methods=["PUT"])
def edit_status(product_id):
    order = OrderProduct.query.get(product_id)
    req = request.json

    order.status = req["status"]

    db.session.add(order)
    db.session.commit()
    return order.to_dict()


@order_routes.route("/<int:product_id>", methods=["DELETE"])
def delete_order(product_id):
    order = OrderProduct.query.get(product_id)
    order_deleted = order.to_dict()
    db.session.delete(order)
    db.session.commit()
    return order_deleted
