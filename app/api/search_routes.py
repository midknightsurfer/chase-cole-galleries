from flask import Blueprint, request

from app.models import db, Product
from app.forms import NewSearch
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint("search", __name__)

@search_routes.route("/", methods=["POST"])
def search_results():
    form = NewSearch()

    form["csrf_token"].data = request.cookies["csrf_token"]
    data = form.data
    search_query = []
    
    if data["query"]:
        search_query.append(Product.title.ilike(f'%{data["query"]}%'))
    if data["query"]:
        search_query.append(Product.description.ilike(f'%{data["query"]}%'))


    specific_products = Product.query.filter(*search_query)

    search_results = [product.to_dict() for product in specific_products]
    print('printing________________', search_results)
    return {"products": search_results}