import React, { use } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router';
import Loading from '../Components/Loading';
import { AuthContext } from '../ContextProviders/AuthContext';

const ErrorPage = () => {
    const {loading} = use(AuthContext);
    if (loading) return <Loading></Loading>
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Navbar />
            <main className="grow flex flex-col items-center justify-center text-center">
                <img
                    src="https://plus.unsplash.com/premium_photo-1682310096066-20c267e20605?q=80&w=912&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="404 Illustration"
                    className="mt-10 h-52 mb-6 rounded-md"
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                    Oops, page not found!
                </h2>
                
                <Link
                    to="/"
                    className="mt-3 inline-block white bg-orange-400 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                >
                    Go Back Home
                </Link>
            </main>
            <Footer />
        </div>
    );
};

export default ErrorPage;