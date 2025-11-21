import React, { use } from 'react';
import logo from "/logo.png";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../ContextProviders/AuthContext';

const Navbar = () => {

    const { user, signOutUser } = use(AuthContext);
 

    const handleSignOut = () => {
        signOutUser().then().catch();
    }

    return (
        <div className="navbar bg-base-100 px-15 py-3 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><NavLink to='/home' className='orrange font-semibold text-xl'>Home</NavLink></li>
                        <li><NavLink to='/allReviews' className='orrange font-semibold text-xl'>All Reviews</NavLink></li>
                        <li><NavLink to='/myReviews' className='orrange font-semibold text-xl'>My Reviews</NavLink></li>
                    </ul>
                </div>

                <div className='flex gap-2 items-center'>
                    <Link>
                        <img
                            src={logo}
                            alt="Food Lovers logo"
                            className="w-20 h-13"
                        />
                    </Link>
                    <Link className="orrange text-4xl font-semibold">Food Lover</Link>
                </div>
            </div>



            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to='/home' className='orrange font-semibold text-xl'>Home</NavLink></li>
                    <li><NavLink to='/allReviews' className='orrange font-semibold text-xl'>All Reviews</NavLink></li>
                    <li><NavLink to='/myReviews' className='orrange font-semibold text-xl'>My Reviews</NavLink></li>
                </ul>
            </div>



            <div className="navbar-end gap-10">

                {user && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="avatar cursor-pointer"
                        >
                            <div className="w-12 rounded-full">
                                <img
                                    src={
                                        user.photoURL ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s"
                                    }
                                    alt="User"
                                />
                            </div>
                        </div>

                        <ul
                            tabIndex={0}
                            className="dropdown-content z-100 menu p-2 shadow bg-base-100 rounded-box w-48"
                        >
                            <li>
                                <NavLink to="/addReview" className="font-semibold">
                                    Add Review
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/myReviews" className="font-semibold">
                                    My Reviews
                                </NavLink>
                            </li>

                             <li>
                                <NavLink to="/myFavourites" className="font-semibold">
                                    My Favourites
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleSignOut}
                                    className="font-semibold orrange"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}

                {/* Login / Logout Button (fallback for no user image) */}
                {!user && (
                    <NavLink to="/auth/login" className="btn font-semibold w-25">
                        Login
                    </NavLink>
                )}

            </div>

        </div>
    );
};

export default Navbar;