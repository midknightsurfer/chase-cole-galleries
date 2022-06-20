from app.models import db, Product


def seed_products():
  product1 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Gorgeous Dining Table w Chairs",
    description="Bob Timberlake Lexington furnitur dining table, and chairs comes with 2 leaves. Leafs are 24 in each.  It is 125x45 w 2  24in extensions has 2 drawers. Gorgeous cherrywood. Look at the top of the table .",
    category_id=2,
    price=2500,
    shipping_price=690,
  )
  product2 = Product(
    user_id=2,
    title="Pier One 1 Pewter Medici Set of 7 Dining Room Chairs",
    description="These are high end chairs, nothing cheap here. Pier 1 Imports  medici pewter and iron chairs w cushions.",
    category_id=2,
    price=950,
    shipping_price=550,
  )  
  product3 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Bedside Nightstand Desk",
    description="Bob Timberlake Lexington furniture bedside Desk Table 833-622",
    category_id=1,
    price=495,
    shipping_price=179,
  )  
  product4 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Cannonball Bed Cailfornia King",
    description="Beautiful as always  king bed, by Lexington Furniture, the famous Cannonball king california bed. Cherrywood, comes w headboard, footboard, 2 side tails",
    category_id=1,
    price=1800,
    shipping_price=329,
  )  
  product5 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Curio Display",
    description="",
    category_id=2,
    price=750,
    shipping_price=350,
  )  
  product6 = Product(
    user_id=2,
    title="Lexington Furniture Sampler Vanity Oak 391",
    description="Beautiful sampler collection vanity oak by lexington",
    category_id=1,
    price=695,
    shipping_price=350,
  )
  product7 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Lamp Table",
    description="Bob Timberlake Lexington Lamp Table  Very hard to find.  Part number 833-944",
    category_id=3,
    price=350,
    shipping_price=125,
  )  
  product8 = Product(
    user_id=2,
    title="Lexington Furniture Vestiges of the Past Queen Bed Mahogany",
    description="Hard to find Lexington Vestges of the past queen bed. In gorgeous condition, such a romantic collection, headboard footboard 2 side rails.",
    category_id=1,
    price=595,
    shipping_price=250,
  )  
  product9 = Product(
    user_id=2,
    title="Two Antique French Curved Twin Bed Set w Vanity",
    description="Ive always loved the beauty olf the antique furniture. Especially the french style, these are from the 1920's",
    category_id=1,
    price=750,
    shipping_price=395,
  )  
  product10 = Product(
    user_id=2,
    title="Marge Carson King Size 4 Poster Bed Briar Finish",
    description="Gorgeous Marge Carson King Size 4 Poster Bed,  Has a Briar Crackle Finish, Leather headboard. Light wear normal for age. posts are 7.5 tall",
    category_id=1,
    price=1500,
    shipping_price=550,
  )  
  product11 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Oak Mission Dresser w Mirror",
    description="Very hard piece to find in oak. This auction is for a oak Timberlake mission dresser and mirror",
    category_id=1,
    price=1895,
    shipping_price=425,
  )
  product12 = Product(
    user_id=2,
    title="Bob Timberlake Carolina Chest Cherry Nightstand 833621",
    description="Bob Timberlake Carolina Chest Nightstand 833621. Beautiful Cherrywood. Has a natural knot on top. Measures 26 w x 18 d x 27 tall",
    category_id=1,
    price=750,
    shipping_price=175,
  )  
  product13 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Quail Hunters Sideboard",
    description="Rare piece of Bob Timberlake furniture stain w Fred Carver color. It's the quail hunters sideboard number 844869",
    category_id=2,
    price=850,
    shipping_price=325,
  )  
  product14 = Product(
    user_id=2,
    title="Heywood Wakefield Victorian Wicker Woven Platform Rocker Glider",
    description="Heywood Wakefield Victorian Wicker Platform Rocker Glider. Estimated to be from 19th century, Ltd measures 46 h x 27.5 wide x 36 d x 16 to top of seat.",
    category_id=3,
    price=995,
    shipping_price=200,
  )  
  product15 = Product(
    user_id=2,
    title="Bob Timberlake Lexington Furniture Plantation Chest Cherry",
    description="Popular Bob Timberlake Plantation Chest Dresser. Cherry, picture is showing it alot darker than it is, more of a cherry color",
    category_id=1,
    price=1200,
    shipping_price=299,
  )    
  product16 = Product(
    user_id=1,
    title="Marge Carson King Size 4 Poster Bed Briar Finish",
    description="Gorgeous Marge Carson King Size 4 Poster Bed,  Has a Briar Crackle Finish, Leather headboard. Light wear normal for age. posts are 7.5 tall",
    category_id=1,
    price=1500,
    shipping_price=550,
  )  
  product17 = Product(
    user_id=1,
    title="Bob Timberlake Lexington Furniture Oak Mission Dresser w Mirror",
    description="Very hard piece to find in oak. This auction is for a oak Timberlake mission dresser and mirror",
    category_id=1,
    price=1895,
    shipping_price=425,
  )
  product18 = Product(
    user_id=1,
    title="Bob Timberlake Carolina Chest Cherry Nightstand 833621",
    description="Bob Timberlake Carolina Chest Nightstand 833621. Beautiful Cherrywood. Has a natural knot on top. Measures 26 w x 18 d x 27 tall",
    category_id=1,
    price=750,
    shipping_price=175,
  )  
  product19 = Product(
    user_id=1,
    title="Bob Timberlake Lexington Quail Hunters Sideboard",
    description="Rare piece of Bob Timberlake furniture stain w Fred Carver color. It's the quail hunters sideboard number 844869",
    category_id=2,
    price=850,
    shipping_price=325,
  )  
  product20 = Product(
    user_id=1,
    title="Heywood Wakefield Victorian Wicker Woven Platform Rocker Glider",
    description="Heywood Wakefield Victorian Wicker Platform Rocker Glider. Estimated to be from 19th century, Ltd measures 46 h x 27.5 wide x 36 d x 16 to top of seat.",
    category_id=3,
    price=995,
    shipping_price=200,
  )  
  product21 = Product(
    user_id=1,
    title="Bob Timberlake Lexington Furniture Plantation Chest Cherry",
    description="Popular Bob Timberlake Plantation Chest Dresser. Cherry, picture is showing it alot darker than it is, more of a cherry color",
    category_id=1,
    price=1200,
    shipping_price=299,
  )  
  db.session.add(product1)
  db.session.add(product2)  
  db.session.add(product3)
  db.session.add(product4)  
  db.session.add(product5)
  db.session.add(product6)
  db.session.add(product7)  
  db.session.add(product8)
  db.session.add(product9)  
  db.session.add(product10)
  db.session.add(product11)
  db.session.add(product12)  
  db.session.add(product13)
  db.session.add(product14)  
  db.session.add(product15)
  db.session.add(product16)
  db.session.add(product17)
  db.session.add(product18)  
  db.session.add(product19)
  db.session.add(product20)  
  db.session.add(product21)  
  db.session.commit()
  

def undo_products():
    db.session.execute("TRUNCATE products RESTART IDENTITY CASCADE;")
    db.session.commit()