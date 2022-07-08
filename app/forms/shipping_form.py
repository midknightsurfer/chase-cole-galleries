from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UpdateShipping(FlaskForm):
    address = StringField(
        'Address', validators=[DataRequired()])
    state = StringField(
        'State', validators=[DataRequired()])    
    city = StringField('City', validators=[DataRequired()])
    zipcode = IntegerField('Zipcode', validators=[DataRequired()])
    phone = StringField('Phone', validators=[DataRequired()])