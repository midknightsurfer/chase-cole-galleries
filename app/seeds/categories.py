from app.models import db, Category

def seed_categories():
  category1 = Category(name="Bedroom")
  category2 = Category(name="Dining Room")  
  category3 = Category(name="Living Room")  
  category4 = Category(name="Office")  
  category5 = Category(name="Outdoor")  
  category6 = Category(name="Other")
  
  
  db.session.add(category1)
  db.session.add(category2)  
  db.session.add(category3)  
  db.session.add(category4)  
  db.session.add(category5)  
  db.session.add(category6)
  
  db.session.commit()


def undo_categories():
    db.session.execute("TRUNCATE categories RESTART IDENTITY CASCADE;")
    db.session.commit()
  