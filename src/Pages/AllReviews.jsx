import React, { use, useEffect, useState } from 'react';
import ReviewCard from '../Components/ReviewCard';
import { AuthContext } from '../ContextProviders/AuthContext';
import Loading from '../Components/Loading';

const AllReviews = () => {

    const { loading } = use(AuthContext);

    const [allReviews, setAllReviews] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [reviewLoading, setReviewLoading] = useState(true);

    // Load all reviews initially
    useEffect(() => {
        setReviewLoading(true);

        fetch("https://assignment-10-server-side-beta.vercel.app/allReviews")
            .then(res => res.json())
            .then(data => {
                setAllReviews(data);
                setReviewLoading(false);
            })
            .catch(err => {
                console.log(err);
                setReviewLoading(false);
            });
    }, []);

    // Search effect
    useEffect(() => {
        // If search box is empty → reload all reviews
        if (searchText.trim() === "") {
            fetch("https://assignment-10-server-side-beta.vercel.app/allReviews")
                .then(res => res.json())
                .then(data => setAllReviews(data));
            return;
        }

        // Searching
        fetch(`https://assignment-10-server-side-beta.vercel.app/search?text=${searchText}`)
            .then(res => res.json())
            .then(data => setAllReviews(data));

    }, [searchText]);

    // Global + Review Loading
    if (loading || reviewLoading) {
        return <Loading />;
    }

    return (
        <div className="px-4 md:px-10">
            <h1 className='text-center mt-10 font-semibold text-3xl orrange'>
                All Reviews
            </h1>

            {/* Search Box */}
            <div className="text-center my-6">
                <input
                    type="text"
                    placeholder="Search food..."
                    className="input input-bordered w-full md:w-1/2"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* No result found */}
            {allReviews.length === 0 && (
                <p className="text-center text-xl text-orange-500 font-semibold mt-10">
                    ❌ No reviews found
                </p>
            )}

            {/* Review Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto mt-10 gap-10 max-w-7xl'>
                {allReviews.map(item => (
                    <ReviewCard key={item._id} i={item} />
                ))}
            </div>
        </div>
    );
};

export default AllReviews;
