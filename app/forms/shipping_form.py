from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class UpdateShipping(FlaskForm):
    address = StringField(
        'Address', validators=[DataRequired()])
    state = StringField(
        'State', validators=[DataRequired()])    
    city = StringField('City', validators=[DataRequired()])
    zipcode = StringField('Zipcode', validators=[DataRequired()])