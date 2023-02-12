import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-secondary">
        <div className="footer-secondary__sitemap">
          <h6>Sitemap</h6>
          <ul>
            <NavLink to="/" exact={true}>
              <li>Homepage</li>
            </NavLink>
            <NavLink to="/myaccount" exact={true}>
              <li>My Account</li>
            </NavLink>
            <NavLink to="/myorders" exact={true}>
              <li>My Orders</li>
            </NavLink>
            {/* <NavLink to="/newproducts" exact={true}>
              <li>New Products</li>
            </NavLink>
            <NavLink to="/favorites" exact={true}>
              <li>Favorites</li>
            </NavLink>
            <NavLink to="/blog" exact={true}>
              <li>Refinisher's Blog</li>
            </NavLink> */}
            <NavLink to="/sell" exact={true}>
              <li>Sell Furniture</li>
            </NavLink>
            {/* <NavLink to="/contact" exact={true}>
              <li>Contact Us</li>
            </NavLink> */}
          </ul>
        </div>
        <div className="footer-secondary__policies">
          <h6>Policies</h6>
          <ul>
            <NavLink to="/policy" exact={true}>
              <li>Terms & Conditions</li>
            </NavLink>
            <NavLink to="/policy" exact={true}>
              <li>Privacy Policy</li>
            </NavLink>
            <NavLink to="/policy" exact={true}>
              <li>Return Policy</li>
            </NavLink>
            <NavLink to="/policy" exact={true}>
              <li>Shipping Policy</li>
            </NavLink>
          </ul>
        </div>

        <div className="footer-secondary__communication">
          <h6>Get in Touch</h6>
          <ul className="footer-secondary__socialicons">
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.facebook.com/ChaseColeGalleries/"
            >
              <li>
                <i class="fa-brands fa-facebook-square"></i>
              </li>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.instagram.com/chasecolegalleries/"
            >
              <li>
                <i class="fa-brands fa-instagram-square"></i>
              </li>
            </a>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://twitter.com/chasecolegaller"
            >
              <li>
                <i class="fa-brands fa-twitter-square"></i>
              </li>
            </a>
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
          <div className="techs">
          <li>Python</li>
          <li>React</li>
          <li>Redux</li>
          <li>SQLAlchemy</li>
          <li>Flask</li>
          <li>PostgreSQL</li>
          <li>Docker</li>

          </div>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
