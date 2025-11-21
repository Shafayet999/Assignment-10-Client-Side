import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const EditReview = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    // Load review data
    useEffect(() => {
        fetch(`https://assignment-10-server-side-beta.vercel.app/reviewDetails/${id}`)
            .then((res) => res.json())
            .then((data) => setFormData(data))
            .catch((err) => console.log(err));
    }, [id]);

    // Loading UI
    if (!formData) {
        return <div className="text-center py-20 text-xl">Loading...</div>;
    }

    // Handle update submit
    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedReview = {
            foodName: e.target.foodName.value,
            photo: e.target.photo.value,
            restaurantName: e.target.restaurantName.value,
            restaurantLocation: e.target.restaurantLocation.value,
            rating: parseFloat(e.target.rating.value),
            reviewText: e.target.reviewText.value,
            date: new Date(),
        };

        fetch(`https://assignment-10-server-side-beta.vercel.app/updateReview/${id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updatedReview),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        icon: "success",
                        title: "Review Updated!",
                        timer: 1200,
                        showConfirmButton: false,
                        background: "#fff",
                        color: "#ff8133",
                    }).then(() => {
                        navigate("/myReviews");
                    });

                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto my-10">
            <h1 className="text-3xl font-semibold orrange text-center mb-8">
                Edit Your Review
            </h1>

            <form onSubmit={handleUpdate} className="space-y-6 shadow-xl p-8 rounded-xl">

                {/* Food Name + Photo */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="label orrange">Food Name</label>
                        <input
                            type="text"
                            name="foodName"
                            defaultValue={formData.foodName}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label orrange">Food Image URL</label>
                        <input
                            type="text"
                            name="photo"
                            defaultValue={formData.photo}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                {/* Restaurant info */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="label orrange">Restaurant Name</label>
                        <input
                            type="text"
                            name="restaurantName"
                            defaultValue={formData.restaurantName}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="label orrange">Location</label>
                        <input
                            type="text"
                            name="restaurantLocation"
                            defaultValue={formData.restaurantLocation}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label className="label orrange">Star Rating</label>
                    <input
                        type="number"
                        name="rating"
                        min="1"
                        max="5"
                        step="0.1"
                        defaultValue={formData.rating}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Review Text */}
                <div>
                    <label className="label orrange">Review Text</label>
                    <textarea
                        name="reviewText"
                        defaultValue={formData.reviewText}
                        rows="5"
                        className="textarea textarea-bordered w-full"
                        required
                    ></textarea>
                </div>

                <button className="btn bg-orrange text-white w-full text-lg font-semibold">
                    Update Review
                </button>
            </form>
        </div>
    );
};

export default EditReview;
