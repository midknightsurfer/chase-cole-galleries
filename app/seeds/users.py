from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name="user", email="demo@aa.io", password="password"
    )
    cynthia = User(
        first_name="Cynthia",
        last_name="Ferguson",
        email="cynthia@chasecolegalleries.com",
        password="nicole1224",
    )
    marnie = User(
        first_name="marnie",
        last_name="Barnie",
        email="marnie@aa.io",
        password="password",
    )
    bobbie = User(
        first_name="bobbie",
        last_name="Brown",
        email="bobbie@aa.io",
        password="password",
    )

    db.session.add(demo)
    db.session.add(cynthia)    
    db.session.add(marnie)
    db.session.add(bobbie)


    db.session.commit()


def undo_users():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()
