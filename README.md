![logo (2)](https://user-images.githubusercontent.com/68219912/174114383-989346e4-e858-486c-83ef-9422aeb7b806.png)

Chase Cole Galleries is an online marketplace to buy and sell used, high-end furniture.

[Live Site](https://chase-cole-galleries.herokuapp.com/)
- Technologies Used
- Database Schema
- Login/Signup
- Listing/Editing Furniture
- Cart/Order System
- Future Features

## Technologies Used

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Database Schema

![image](https://user-images.githubusercontent.com/68219912/174128240-d25bee78-1e78-47ec-9c33-c37f5f225c77.png)

## Login/Signup

A user clicks on Sign In at the bottom of the main menu and it takes them to a page where they can enter thier email address.

![image](https://user-images.githubusercontent.com/68219912/174128598-4be4498a-093c-4691-9fbf-e32f4b72b9d4.png)

If the user enters an email that exists in the database they will be met with a password prompt, otherwise the site will serve the user with a Sign Up form. Once filled out and submitted, assuming they will pass the validations, the user will be automatically logged in. The demo login button logs a user in under the demo account for the purpose of surveying the website.

## Listing/Editing Furniture

A user is able to click on Sell my Furniture in the main menu to get to the form to list a new item. Picture upload is handled by Amazon Web Services S3.

![image](https://user-images.githubusercontent.com/68219912/174129605-2d6c6dc9-a6ce-429d-acda-05cf8a9a6f5d.png)

A user can also edit or delete listings that they own from whatever page with the note pad and trash can icons, which also say edit and delete when you mouse over.

![image](https://user-images.githubusercontent.com/68219912/174130118-20b2ca3f-8b35-44c6-96f7-fcdce9bbeaee.png)

## Cart/Order System

A user is able to add items to a cart which totals the shipping and price of all cart items and creates an order when sent to checkout. The cart is opened with the flatbed icon on the navbar and users mays delete items from the cart with the trash can icon. Once an order is created, it may be viewed in the My Orders section of the main menu. Sellers can also find their pending orders in that location where they will be able to modify it's status.

## Future Features and Updates

- Done by pregrade day - 6/16
- - First two features CRUD (Furniture Listing and Order System
- - My Orders Page
- - Cart Functionality
- - Error Handling
- Done by presentation day - 6/20
- - Category Filtering
- - Search
- - Footer
- - My Account Page
- - Demo user seeding
- Done by Graduation - 7/1
- - Policy Pages
- - Favorites
- - Newly Added
- - Payment Processor
- - Additional Seeding
- Done on Sprint weeks and beyond
- - Refinisher's blog
- - User Avatars
- - Email Subscribers List
- - Contact Page
- - Domain Name Transfer
- - Secure Credit Card storage

