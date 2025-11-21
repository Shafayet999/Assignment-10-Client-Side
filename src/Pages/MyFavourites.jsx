import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../ContextProviders/AuthContext";
import Loading from "../Components/Loading";

const MyFavourites = () => {
    const { user, loading } = useContext(AuthContext);
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/myFavorites/${user.email}`)
            .then((res) => res.json())
            .then((data) => setFavs(data))
            .catch((err) => console.log(err));
    }, [user?.email]);

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="max-w-6xl mx-auto mt-10 px-5">
            <h1 className="text-3xl font-semibold orrange text-center mb-10">
                My Favorites 
            </h1>

            {favs.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">
                    You haven't added any favorites yet
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {favs.map((i) => (
                        <div
                            key={i._id}
                            className="card shadow-xl rounded-xl overflow-hidden hover:scale-[1.02] transition"
                        >
                            <figure className="h-64">
                                <img
                                    src={i.photo}
                                    alt={i.foodName}
                                    className="w-full h-full object-cover"
                                />
                            </figure>

                            <div className="card-body">
                                <h2 className="card-title orrange text-xl">
                                    {i.foodName}
                                </h2>

                                <p className="font-semibold flex items-center gap-1">
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

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default MyFavourites;
