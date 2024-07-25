import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    var [search, setSearch] = useState("");
    let navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/login")
    }
    function postSearch(e) {
        e.preventDefault();
        navigate({
            pathname: "/shop",
            search: "?search=" + search,
        });
    }
    return (
        <>

            {/* <!-- Topbar Start --> */}
            <div className="container-fluid bg-light p-0">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-4 px-5 text-start">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-map-marker-alt text-primary me-2"></small>
                            <small>Delhi, India</small>
                        </div>
                    </div>
                    <div className="col-lg-8 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-phone-alt text-primary me-2"></small>
                            <small><Link to="tel:9608267530">+91-9608267530 </Link></small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            <small className="fa fa-envelope text-primary me-2"></small>
                            <small><Link to="mailto:vimalbhartiofficial@gmail.com">vimalbhartiofficial@gmail.com</Link></small>
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-facebook-f"></i></Link>
                            <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-twitter"></i></Link>
                            <Link className="btn btn-sm-square bg-white text-primary me-1" to=""><i className="fab fa-linkedin-in"></i></Link>
                            <Link className="btn btn-sm-square bg-white text-primary me-0" to=""><i className="fab fa-instagram"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}


            {/* <!-- Navbar Start --> */}
            <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                    <h2 className="m-0 text-primary"><i className="fa fa-shopping-cart me-3"></i>Kifayti</h2>
                </Link>
                <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav ms-auto p-4 p-lg-0">
                        {/* <div className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                Menu
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to="/about" className="dropdown-item">About</Link></li>
                                <li><Link to="/shop" className="dropdown-item">Shop</Link></li>
                                <li><Link to="/contact" className="dropdown-item">Contact</Link></li>
                            </ul>
                        </div> */}
                        <div className="nav-item dropdown">
    <button className="nav-link dropdown-toggle" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{height: "30px", border:"none", backgroundColor:"transparent"}}>
        Menu
    </button>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><Link to="/about" className="dropdown-item">About</Link></li>
        <li><Link to="/shop" className="dropdown-item">Shop</Link></li>
        <li><Link to="/contact" className="dropdown-item">Contact</Link></li>
    </ul>
</div>

                        <Link to="/about" className="nav-item nav-link">About</Link>
                        <Link to="/shop" className="nav-item nav-link">Shop</Link>
                        <Link to="/contact" className="nav-item nav-link">Contact</Link>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1">
                        <form onSubmit={postSearch} className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                placeholder="Search"
                                aria-label="Search"
                                style={{ maxWidth: '200px' }}
                            />
                            <button className="btn btn-outline-primary" type="submit">Search</button>
                        </form>
                    </div>


                    <div className="navbar-nav">
                        <Link to="/cart" className="nav-item nav-link"><i className="fa fa-shopping-cart fa-lg"></i></Link>
                        <Link to="/wishlist" className="nav-item nav-link"><i className="fa fa-heart fa-lg"></i></Link>
                    </div>
                    {localStorage.getItem("login") ?
                        <div className="nav-item dropdown  bg-danger">
                            <a to="#" className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown">{localStorage.getItem("name")}</a>
                            <div className="dropdown-menu fade-up m-0">
                                {localStorage.getItem("role") === "Admin" ?
                                    <Link to="/admin" className="dropdown-item">Profile</Link> :
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                }
                                {localStorage.getItem("role") === "Buyer" ?
                                    <>
                                        <Link to="/checkout" className="dropdown-item">Checkout</Link>
                                        <Link to="/order" className="dropdown-item">My Orders</Link>
                                    </> : ""
                                }
                                <button className="dropdown-item" onClick={logout}>Logout</button>
                            </div>
                        </div>
                        :
                        <Link to="/login" className="btn btn-primary p-3">Login</Link>
                    }
                </div>
            </nav>

            {/* <!-- Navbar End --> */}


        </>
    )
}
