from flask_wtf import FlaskForm
from wtforms import StringField


class NewSearch(FlaskForm):
  query = StringField('Search')