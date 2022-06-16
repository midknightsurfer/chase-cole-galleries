from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import NewOrder
from app.models import db, Product, Order


order_routes = Blueprint("orders", __name__)


@order_routes.route('/<int:userId>')
def all_orders(userId):
    orders = Order.query.filter(Order.user_id == userId)

    return {"orders" : [order.to_dict() for order in orders]}

@order_routes.route("", methods=["POST"])
@login_required
def new_order():
    form = NewOrder()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        order = Order(
            user_id=data["user_id"],
            product_id=data["product_id"],
            status=data["status"],
        )

        db.session.add(order)
        db.session.commit()

        return orders

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
