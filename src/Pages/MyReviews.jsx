import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextProviders/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router";

const MyReviews = () => {
    const { user, loading } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        setReviewsLoading(true);

        fetch(`http://localhost:3000/reviewsByEmail?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
                setReviewsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setReviewsLoading(false);
            });
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it",
        }).then((result) => {
            if (!result.isConfirmed) return;

            fetch(`http://localhost:3000/deleteReview/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    const updated = reviews.filter((r) => r._id !== id);
                    setReviews(updated);

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been removed.",
                        icon: "success",
                        timer: 1300,
                        showConfirmButton: false,
                    });

                    if (updated.length === 0) {
                        setTimeout(() => navigate("/"), 1300);
                    }
                });
        });
    };

    if (loading || reviewsLoading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
            <h1 className="text-3xl font-semibold orrange text-center mb-10">
                My Reviews ({reviews.length})
            </h1>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">
                    You haven't added any reviews yet.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="table w-full">
                        <thead className="bg-orange-100 text-orange-700 text-lg">
                            <tr>
                                <th>Photo</th>
                                <th>Food Name</th>
                                <th>Restaurant</th>
                                <th>Date</th>
                                <th>Review</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reviews.map((review) => (
                                <tr
                                    key={review._id}
                                    className="hover:bg-orange-50 transition-all"
                                >
                                    <td>
                                        <img
                                            src={review.photo}
                                            alt={review.foodName}
                                            className="w-20 h-20 object-cover rounded-lg border"
                                        />
                                    </td>

                                    <td className="font-semibold">
                                        {review.foodName}
                                    </td>

                                    <td>{review.restaurantName}</td>

                                    <td>
                                        {review.date
                                            ? new Date(review.date).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </td>

                                    <td className="max-w-xs">
                                        <p className="text-gray-600">
                                            {review.reviewText.length > 60
                                                ? review.reviewText.substring(0, 60) + "..."
                                                : review.reviewText}
                                        </p>
                                    </td>

                                    <td>
                                        <div className="flex items-center gap-3 justify-center">
                                            <button
                                                className="btn btn-sm bg-orrange text-white border-none"
                                                onClick={() => navigate(`/editReview/${review._id}`)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-sm bg-red-500 text-white border-none"
                                                onClick={() => handleDelete(review._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyReviews;
