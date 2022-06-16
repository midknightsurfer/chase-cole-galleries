from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class NewOrder(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    product_id = IntegerField("product_id", validators=[DataRequired()])
    status = StringField("status", validators=[DataRequired()])

    