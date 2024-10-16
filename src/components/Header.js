import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout'; // Import the Logout icon

const Header = ({ active, setActive, user, handleLogout }) => {
    const userId = user?.uid;

    return (
        <nav className="navbar navbar-expand-lg navbar-light custom-navbar fixed-top">
            <div className="container-fluid">
                <div className="container">
                    <nav className="navbar navbar-toggleable-md navbar-light">
                        <button
                            className="navbar-toggler mt-3"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="true"
                            aria-label="Toggle Navigation"
                        >
                            <span className="fa fa-bars"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link to="/" className="nav-link-item">
                                    <li className={`nav-item nav-link ${active === "home" ? "active" : ""}`} onClick={() => setActive("home")}>Home</li>
                                </Link>
                                <Link to="/blogs" className="nav-link-item">
                                    <li className={`nav-item nav-link ${active === "blogs" ? "active" : ""}`} onClick={() => setActive("blogs")}>Blogs</li>
                                </Link>

                                {userId && (
                                    <Link to="/create" className="nav-link-item">
                                        <li className={`nav-item nav-link ${active === "create" ? "active" : ""}`} onClick={() => setActive("create")}>Create</li>
                                    </Link>
                                )}
                            </ul>

                            <div className="row g-3">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    {userId ? (
                                        <>
                                            <div className="profile-logo">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                    alt="logo"
                                                    className="profile-image"
                                                />
                                            </div>
                                            <p className="profile-name">{user?.displayName}</p>
                                            <li className="nav-item nav-link logout-button" onClick={handleLogout}>
                                                <LogoutIcon style={{ marginRight: '8px', color: '#fff' }} /> {/* Icon color can be adjusted */}
                                                {/* Optional: Remove text for only icon */}
                                            </li>
                                        </>
                                    ) : (
                                        <Link to="/auth" className="nav-link-item">
                                            <li className={`nav-item nav-link ${active === "login" ? "active" : ""}`} onClick={() => setActive("login")}>Login</li>
                                        </Link>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </nav>
    );
};

export default Header;
