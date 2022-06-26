import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
    <div className="homepage-footer">
    <div className="homepage-footer__sitemap">
      <h6>- Sitemap -</h6>
      <ul>
        <li>Homepage</li>
        <li>My Account</li>
        <li>My Orders</li>
        <li>New Products</li>
        <li>Favorites</li>
        <li>Refinisher's Blog</li>
        <li>Sell Furniture</li>
        <li>Contact Us</li>
      </ul>
    </div>
    <div className="homepage-footer__policies">
      <h6>- Policies -</h6>
      <ul>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
        <li>Return Policy</li>
        <li>Shipping Policy</li>
      </ul>
    </div>

    <div className="homepage-footer__communication">
      <h6>- Get in Touch -</h6>
      <ul className="homepage-footer__socialicons">
        <li><i class="fa-brands fa-facebook-square"></i></li>
        <li><i class="fa-brands fa-instagram-square"></i></li>
        <li><i class="fa-brands fa-twitter-square"></i></li>
      </ul>
    </div>
  </div>
    <footer className="footer">
      <ul className="footer-ul">
        <li className="footer-text">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/midknightsurfer/chase-cole-galleries"
            className="white"
          >
            GitHub Repository | Chase Cole Galleries 2022
          </a>
        </li>
        <li>
          <div className="github-dev">
            <span className="github-dev-span">Beau</span>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/midknightsurfer"
            >
              <i className="fab fa-github" />
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/beau-t-ferguson/"
            >
              <i className="fab fa-linkedin" />
            </a>
          </div>
        </li>
        <li>Python</li>
        <li>React</li>
        <li>Redux</li>
        <li>SQLAlchemy</li>
        <li>Flask</li>
        <li>PostgreSQL</li>
        <li>Docker</li>
      </ul>
    </footer>    
    </>

  );
};

export default Footer;
