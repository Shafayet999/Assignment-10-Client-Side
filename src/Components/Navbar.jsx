import React, { use } from "react";
import logo from "/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../ContextProviders/AuthContext";

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser().catch(() => { });
    };

    return (
        <div className="navbar bg-base-100 px-4 md:px-10 py-3 shadow-sm sticky top-0 z-50">

            {/* LEFT SECTION */}
            <div className="navbar-start">
                {/* MOBILE MENU */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-50 mt-3 w-52 p-3 shadow-lg"
                    >
                        <li><NavLink to="/home" className="font-semibold orrange">Home</NavLink></li>
                        <li><NavLink to="/allReviews" className="font-semibold orrange">All Reviews</NavLink></li>
                        <li><NavLink to="/myReviews" className="font-semibold orrange">My Reviews</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/addReview" className="font-semibold orrange">Add Review</NavLink></li>
                                <li><NavLink to="/myFavourites" className="font-semibold orrange">My Favourites</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* LOGO */}
                <Link to="/home" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-16 md:w-20"
                    />
                    <span className="text-2xl md:text-4xl font-bold orrange">Food Lover</span>
                </Link>
            </div>

            {/* CENTER MENU (DESKTOP ONLY) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3">
                    <li><NavLink to="/home" className="font-semibold orrange text-lg">Home</NavLink></li>
                    <li><NavLink to="/allReviews" className="font-semibold orrange text-lg">All Reviews</NavLink></li>
                    <li><NavLink to="/myReviews" className="font-semibold orrange text-lg">My Reviews</NavLink></li>
                </ul>
            </div>

            {/* RIGHT SECTION */}
            <div className="navbar-end gap-4 md:gap-8">

                {/* USER LOGGED IN */}
                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="cursor-pointer">
                            <div className="avatar">
                                <div className="w-12 rounded-full border">
                                    <img
                                        src={
                                            user.photoURL ||
                                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                                        }
                                        alt="User"
                                    />
                                </div>
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 p-3 shadow-lg rounded-xl w-48 z-50"
                        >
                            <li><NavLink to="/addReview" className="font-semibold">Add Review</NavLink></li>
                            <li><NavLink to="/myReviews" className="font-semibold">My Reviews</NavLink></li>
                            <li><NavLink to="/myFavourites" className="font-semibold">My Favourites</NavLink></li>

                            <li>
                                <button onClick={handleSignOut} className="font-semibold text-red-500">
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {/* IF NOT LOGGED IN */}
                {!user && (
                    <NavLink to="/auth/login" className="btn btn-sm md:btn-md font-semibold">
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
