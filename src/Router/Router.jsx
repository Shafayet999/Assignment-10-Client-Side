import { createBrowserRouter } from "react-router";
import MainLayout from "../Pages/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Pages/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllReviews from "../Pages/AllReviews";
import ReviewDetails from "../Pages/ReviewDetails";
import AddReview from "../Pages/AddReview";
import MyReviews from "../Pages/MyReviews";
import PrivateRoute from "./PrivateRoute";
import EditReview from "../Pages/EditReview";
import ErrorPage from "../Pages/ErrorPage";
import MyFavourites from "../Pages/MyFavourites";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/allReviews",
                element: <AllReviews></AllReviews>
            },
            {
                path: "/reviweDetails/:id",
                element: <ReviewDetails></ReviewDetails>
            },
            {
                path: "/addReview",
                element: <PrivateRoute>
                    <AddReview></AddReview>
                </PrivateRoute>
            },
            {
                path: "/myReviews",
                element: <PrivateRoute>
                    <MyReviews></MyReviews>
                </PrivateRoute>
            },
            {
                path: "/myFavourites",
                element: <PrivateRoute>
                    <MyFavourites></MyFavourites>
                </PrivateRoute>
            },
            {
                path: "/editReview/:id",
                element: <PrivateRoute>
                    <EditReview></EditReview>
                </PrivateRoute>
            }

        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login', element: <Login></Login>
            },
            {
                path: '/auth/register', element: <Register></Register>
            },
        ]
    },
    { path: '*', element: <ErrorPage /> },
])

export default router;