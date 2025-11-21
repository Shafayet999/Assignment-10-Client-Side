import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../ContextProviders/AuthContext';

const ReviewCard = ({ i }) => {

    const { user } = use(AuthContext)

    const [fav, setFav] = useState(false);
    useEffect(() => {
        if (!user) return;

        fetch(`https://assignment-10-server-side-beta.vercel.app/myFavorites/${user.email}/${i._id}`)
            .then(res => res.json())
            .then(data => setFav(data.isFav));
    }, [user, i._id]);

    const handleFavorite = () => {
        if (!user) {
            return alert("You must login to add favorites!");
        }

        setFav(!fav);

        const favData = {
            reviewId: i._id,
            email: user.email,
            foodName: i.foodName,
            photo: i.photo,
            restaurantName: i.restaurantName,
            restaurantLocation: i.restaurantLocation,
            rating: i.rating,
            reviewerName: i.reviewerName,
            date: new Date(),
        };

        if (fav) {
            fetch(`https://assignment-10-server-side-beta.vercel.app/removeFavorite/${user.email}/${i._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Removed from favorites:", data);
                    setFav(false);
                });
        }

        // Not favorite → add
        else {
            fetch("https://assignment-10-server-side-beta.vercel.app/addFavorite", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(favData),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Added to favorites:", data);
                    setFav(true);
                });
        }
    };


return (
    <div className="card shadow rounded-xl overflow-hidden transition-transform duration-300 hover:scale-101">
        <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 bg-white shadow-md p-2 rounded-full z-10 hover:scale-110 transition"
        >
            {fav ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#ff4d4d"
                    viewBox="0 0 24 24"
                    className="animate-pulse"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                        2 8.5 2 5.42 4.42 3 7.5 
                        3c1.74 0 3.41.81 4.5 2.09C13.09 
                        3.81 14.76 3 16.5 3 19.58 3 22 
                        5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                        11.54L12 21.35z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#ff8133"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M12.1 21.3l-1.1-1C5.1 15.1 2 12.3 2 
                        8.5 2 5.4 4.4 3 7.5 
                        3c1.7 0 3.4.8 4.5 
                        2.1C13.1 3.8 14.8 3 16.5 
                        3 19.6 3 22 5.4 22 
                        8.5c0 3.8-3.1 6.6-9 
                        11.8l-1 .9z"/>
                </svg>
            )}
        </button>
        {/* Image */}
        <figure className="h-60">
            <img
                src={i.photo}
                alt={i.foodName}
                className="w-full h-full object-cover object-center"
                referrerPolicy='no-referrer'
            />
        </figure>

        {/* Body */}
        <div className="card-body">
            <h2 className="card-title text-xl font-semibold orrange">{i.foodName}</h2>
            <p className="text-lg font-semibold flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="#ff8133"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 21v-9l9-7 9 7v9h-6v-6h-6v6H3zm7-2v-4h4v4h3v-7.5L12 
    7 7 11.5V19h3z"/>
                </svg>

                {i.restaurantName}
            </p>
            <p className="text-md flex items-center gap-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#ff8133"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 
    11.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 6.5 12 6.5s3.5 1.57 3.5 3.5S13.93 
    13.5 12 13.5z"/>
                </svg>

                {i.restaurantLocation}
            </p>

            <div className="flex justify-between items-center mt-3">
                <span className="text-md">👤 {i.reviewerName}</span>
                <span className="font-semibold text-md text-orange-500 inline-flex items-center gap-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#ff8133"
                        viewBox="0 0 24 24"
                        className="relative -top-[3px]"
                    >
                        <path d="M12 .587l3.668 7.568L24 9.748l-6 5.847L19.335 
    24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.593z"/>
                    </svg>

                    {i.rating}/5
                </span>

            </div>

            <div className="card-actions mt-2">
                <Link to={`/reviweDetails/${i._id}`} className="btn bg-orrange text-white w-full border-none">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);
};


export default ReviewCard;