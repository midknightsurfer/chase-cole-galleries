from flask import Blueprint, json, request
from app.models import db, Favorite
from flask_login import login_required

favorite_routes = Blueprint('favorites', __name__)

@login_required
@favorite_routes.route("", methods=["POST"])
def post_favorite():

    data = json.loads(request.data)
    print(data)
    new_favorite = Favorite(
        user_id = data["user_id"],
        product_id = data["product_id"]
        )
    db.session.add(new_favorite)
    db.session.commit()

    favorite = Favorite.query.get(new_favorite.id)
    return favorite.to_dict()

@login_required
@favorite_routes.route("/<int:id>", methods=["DELETE"])
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    db.session.delete(favorite)
    db.session.commit()
    return favorite.to_dict()