import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Sell Your Talent</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Business</span>
          
          <span>Explore</span>
        
          <span>English</span>
          {!currentUser?.isSeller && <span></span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Services
                      </Link>
                      <Link className="link" to="/add">
                        Add New Service
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="gigs?search=mern">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="gigs?search=mern">
              Development
            </Link>
            <Link className="link menuLink" to="/gigs?search=plumber">
              Plumber
            </Link>
            <Link className="link menuLink" to="/">
              Electrician
            </Link>
            <Link className="link menuLink" to="gigs?search=Tailor">
              Tailors
            </Link>
            <Link className="link menuLink" to="gigs?search=music">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?search=mern">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
