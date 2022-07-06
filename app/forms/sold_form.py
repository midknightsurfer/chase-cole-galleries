from flask_wtf import FlaskForm
from wtforms import BooleanField


class UpdateSold(FlaskForm):
    sold = BooleanField("Sold")