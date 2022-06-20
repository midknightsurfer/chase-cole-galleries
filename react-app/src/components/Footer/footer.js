import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
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
  );
};

export default Footer;
