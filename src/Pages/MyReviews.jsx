import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextProviders/AuthContext";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router";

const MyReviews = () => {
    const { user, loading } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/reviewsByEmail?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {setReviews(data), setReviewsLoading(false);})
            .catch((err) => {
            console.log(err);
            setReviewsLoading(false);
        });
    }, [user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/deleteReview/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        const updated = reviews.filter((r) => r._id !== id);
                        setReviews(updated);

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success",
                            timer: 1200,
                            showConfirmButton: false,
                        });

                       
                        if (updated.length === 0) {
                            setTimeout(() => navigate("/"), 1200);
                        }
                    });
            }
        });
    };

    if (loading || reviewsLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-semibold orrange text-center mb-10">
                My Reviews({reviews.length})
            </h1>

            {reviews.length === 0 && (
                <p className="text-center text-gray-500 text-xl">
                    You haven't added any reviews yet.
                </p>
            )}

            {reviews.length > 0 && (
                <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
                    <table className="table w-full">
                        <thead className="bg-orange-100 text-orange-700 text-lg">
                            <tr>
                                <th>Photo</th>
                                <th>Food Name</th>
                                <th>Restaurant</th>
                                <th>Posted Date</th>
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


                                    <td className="font-semibold">{review.foodName}</td>


                                    <td>{review.restaurantName}</td>

                                    {/* Date */}
                                    <td>{new Date(review.date).toLocaleDateString("en-GB")}</td>


                                    <td className="max-w-xs">
                                        <p className="text-gray-600">
                                            {review.reviewText.length > 60
                                                ? review.reviewText.substring(0, 60) + "..."
                                                : review.reviewText}
                                        </p>
                                    </td>


                                    <td>
                                        <div className="flex items-center gap-3 justify-center h-full">
                                            <button
                                                className="btn btn-sm bg-orrange text-white border-none"
                                                onClick={() =>
                                                    (window.location.href = `/editReview/${review._id}`)
                                                }
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
