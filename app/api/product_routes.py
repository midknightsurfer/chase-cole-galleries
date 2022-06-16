from flask import Blueprint, request
from flask_login import login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import NewProductForm
from app.models import db, Product, Image

from app.aws_s3 import *


product_routes = Blueprint("products", __name__)


@product_routes.route("")
def get():
    products = Product.query.all()

    results = [product.to_dict() for product in products]

    return {"products": results}


@product_routes.route("", methods=["POST"])
@login_required
def add_product():
    form = NewProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        product = Product(
            user_id=data["user_id"],
            title=data["title"],
            description=data["description"],
            category_id=data["category_id"],
            price=data["price"],
            shipping_price=data["shipping_price"],
        )

        db.session.add(product)
        db.session.commit()

        return product.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route("/<int:productId>", methods=["PUT"])
@login_required
def update(productId):
    form = NewProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        product = Product.query.filter(Product.id == productId).first()

        product.user_id = data["user_id"]
        product.title = data["title"]
        product.description = data["description"]
        product.category_id = data["category_id"]
        product.shipping_price = data["shipping_price"]
        product.price = data["price"]

        images = Image.query.filter(Image.product_id == productId).all()
        for image in images:
            db.session.delete(image)
        db.session.commit()

        return product.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route("/<int:productId>", methods=["DELETE"])
@login_required
def delete_product(productId):
    productToDelete = Product.query.filter(Product.id == productId).first()

    if productToDelete:
        db.session.delete(productToDelete)
        db.session.commit()
        return {
            "id": productToDelete.id,
            "user_id": productToDelete.user_id,
            "title": productToDelete.title,
            "description": productToDelete.description,
            "category_id": productToDelete.category_id,
            "price": productToDelete.price,
            "shipping_price": productToDelete.shipping_price,
        }


@product_routes.route("/images", methods=["POST"])
@login_required
def add_product_images():
    newFile = request.form.get("newFile")
    if newFile == "true":
        if "file" not in request.files:
            return "No user_file key in request.files"
        file = request.files["file"]

        if file:
            product_id = request.form.get("product_id")
            file_url = upload_file_to_s3(file)
            image = Image(product_id=product_id, url=file_url["url"])
            db.session.add(image)
            db.session.commit()

    if newFile == "false":
        print("********************************")
        product_id = request.form.get("product_id")
        url = request.form.get("file")
        image = Image(product_id=product_id, url=url)
        db.session.add(image)
        db.session.commit()

    return {"message": "okay"}
