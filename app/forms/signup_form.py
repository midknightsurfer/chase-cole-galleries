from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use.")

def password_matches(form, field):
    # Checking if passwords match
    password = form.password.data
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError("Passwords do not match.")

class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    email = StringField("email", validators=[DataRequired(), user_exists])
    password = StringField("password", validators=[DataRequired()])
    repeat_password = StringField("Confirm Password", validators=[DataRequired(), password_matches])    
