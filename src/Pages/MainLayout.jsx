import React, { use } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { AuthContext } from '../ContextProviders/AuthContext';
import Loading from '../Components/Loading';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    const { loading } = use(AuthContext);
    if(loading) return <Loading></Loading>;   
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='flex-1'>
                <ToastContainer position="top-right" autoClose={1500} />
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;