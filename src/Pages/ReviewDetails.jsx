import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const ReviewDetails = () => {
  const { id } = useParams();
  const [detailReview, setDetailReview] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/reviewDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setDetailReview(data));
  }, [id]);

  if (!detailReview) {
    return <p className="text-center text-xl mt-20">Loading...</p>;
  }

  const {
    photo,
    foodName,
    restaurantName,
    restaurantLocation,
    reviewerName,
    rating,
    reviewText
  } = detailReview;

  return (
    <div className="max-w-4xl mx-auto px-4 py-5">

      {/* Banner Image */}
      <div className="relative w-full h-80 md:h-120 rounded-2xl overflow-hidden shadow-xl">
        <img
          src={photo}
          alt={foodName}
          className="w-full h-full object-cover"
        />

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Food Name */}
        <h1 className="absolute bottom-5 left-5 text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {foodName}
        </h1>
      </div>

      {/* Content */}
      <div className="mt-5 space-y-2 text-lg">

        {/* Restaurant */}
        <p className="flex items-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#ff8133"
            viewBox="0 0 24 24"
          >
            <path d="M3 21v-9l9-7 9 7v9h-6v-6h-6v6H3zm7-2v-4h4v4h3v-7.5L12 
            7 7 11.5V19h3z"/>
          </svg>
          <span className="font-semibold">{restaurantName}</span>
        </p>

        {/* Location */}
        <p className="flex items-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ff8133"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
            7-13c0-3.87-3.13-7-7-7zm0 11.5c-1.93 
            0-3.5-1.57-3.5-3.5S10.07 6.5 12 
            6.5s3.5 1.57 3.5 3.5S13.93 13.5 12 
            13.5z"/>
          </svg>
          {restaurantLocation}
        </p>

        {/* Reviewer */}
        <p className="flex items-center gap-2 text-gray-700">
          👤 <span className="font-medium">{reviewerName}</span>
        </p>

        {/* Rating */}
        <p className="flex items-center gap-1 orrange text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="#ff8133"
            viewBox="0 0 24 24"
            className="inline-block align-middle relative -top-0.5"
          >
            <path d="M12 .587l3.668 7.568L24 9.748l-6 5.847L19.335 
            24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.593z"/>
          </svg>
          
          {rating}/5
        </p>

        {/* Full Review */}
        <p className="text-gray-600 text-lg leading-relaxed">
          {reviewText}
        </p>

      </div>

      {/* Back Button */}
      <div className="mt-5">
        <Link
          to="/allReviews"
          className="btn bg-orrange text-white border-none px-8"
        >
          Back to All Reviews
        </Link>
      </div>

    </div>
  );
};

export default ReviewDetails;
