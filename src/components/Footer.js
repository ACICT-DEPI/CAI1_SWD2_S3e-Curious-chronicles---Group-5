import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-column">
                        <h4 className="footer-title">About Us</h4>
                        <p>
                            We are a blog platform delivering top-quality content on various
                            topics. Stay connected and enjoy our updates!
                        </p>
                    </div>
                    <div className="col-md-4 footer-column">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:ywsfyasr@gmail.com">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column">
                        <h4 className="footer-title">Follow Us</h4>
                        <ul className="footer-social">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
