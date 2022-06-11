from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField, DecimalField
from wtforms.validators import DataRequired


class NewProductForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])  
    description = TextAreaField("Description", validators=[DataRequired()])
    user_id = IntegerField("UserId", validators=[DataRequired()])
    category_id = SelectField("Type", choices=[1, 2, 3, 4, 5, 6])
    price = DecimalField("Price", validators=[DataRequired()])
    shipping_price = DecimalField("Shipping Price", validators=[DataRequired()])    
    
    