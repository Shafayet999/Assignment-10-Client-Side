import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../ContextProviders/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddReview = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();



    // useEffect(() => {
    //     fetch("https://assignment-10-server-side-beta.vercel.app/allReviews")
    //         .then(res => res.json())
    //         .then(data => setReviews(data))
    //         .catch(err => console.log(err));
    // }, []);


    const handleAddReview = (e) => {
        e.preventDefault();
        const form = e.target;

        const newReview = {
            foodName: form.foodName.value,
            photo: form.photo.value,
            restaurantName: form.restaurantName.value,
            restaurantLocation: form.restaurantLocation.value,
            rating: parseFloat(form.rating.value),
            reviewText: form.reviewText.value,
            email: user?.email,
            reviewerName: user?.displayName,
            date: new Date(),
        };
        console.log(newReview);
        fetch("https://assignment-10-server-side-beta.vercel.app/allReviews", {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newReview)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your review has been placed.",
                        showConfirmButton: false,
                        timer: 1500

                    }).then(() => {
                        navigate('/myReviews');
                    });

                }
            })
    }
    return (
        <div className="card w-full max-w-xl mx-auto mt-10 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleAddReview}>
                    <fieldset className="fieldset space-y-2">

                        {/* Food Name */}
                        <div className="flex items-center gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                className="input orrange flex-1"
                                placeholder="Enter food name"
                                required
                            />
                        </div>

                        {/* Food Image */}
                        <div className="flex items-center gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Food Image URL</label>
                            <input
                                type="text"
                                name="photo"
                                className="input orrange flex-1"
                                placeholder="Paste image URL"
                                required
                            />
                        </div>

                        {/* Restaurant Name */}
                        <div className="flex items-center gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Restaurant Name</label>
                            <input
                                type="text"
                                name="restaurantName"
                                className="input orrange flex-1"
                                placeholder="Restaurant name"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Location</label>
                            <input
                                type="text"
                                name="restaurantLocation"
                                className="input orrange flex-1"
                                placeholder="e.g. Banani, Dhaka"
                                required
                            />
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Star Rating</label>
                            <input
                                type="number"
                                name="rating"
                                min="1"
                                max="5"
                                step="0.1"
                                className="input orrange flex-1"
                                placeholder="1 to 5"
                                required
                            />
                        </div>

                        {/* Review Text */}
                        <div className="flex items-start gap-4">
                            <label className="label font-semibold text-lg orrange w-40">Review Details</label>
                            <textarea
                                name="reviewText"
                                className="textarea orrange flex-1 h-32"
                                placeholder="Write your detailed review..."
                                required
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="btn bg-orrange text-white px-10 border-none"
                            >
                                Submit Review
                            </button>
                        </div>

                    </fieldset>
                </form>


            </div>
        </div>
    );
};

export default AddReview;