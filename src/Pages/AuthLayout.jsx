import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>

            <Navbar></Navbar>

            <main className='w-11/12 mx-auto py-5 flex-1'>
            <ToastContainer position="top-right" autoClose={1500} />
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;