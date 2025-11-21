import React, { use, useEffect, useState } from 'react';
import ReviewCard from '../Components/ReviewCard';
import { AuthContext } from '../ContextProviders/AuthContext';
import Loading from '../Components/Loading';

const AllReviews = () => {

    const { loading } = use(AuthContext);

    const [allReviews, setAllReviews] = useState([]);
    const [searchText, setSearchText] = useState("");

    // Load all reviews initially
    useEffect(() => {
        fetch("http://localhost:3000/allReviews")
            .then(res => res.json())
            .then(data => setAllReviews(data))
            .catch(err => console.log(err));
    }, []);

    // Search effect
    useEffect(() => {
        if (searchText.trim() === "") {
            fetch("http://localhost:3000/allReviews")
                .then(res => res.json())
                .then(data => setAllReviews(data));
            return;
        }

        fetch(`http://localhost:3000/search?text=${searchText}`)
            .then(res => res.json())
            .then(data => setAllReviews(data));

    }, [searchText]);

    if (loading || allReviews.length === 0) {
        return <Loading />;
    }

    return (
        
        <div>
            <h1 className='text-center mt-10 font-semibold text-3xl orrange'>All Reviews</h1>

            <div className="text-center my-6">
                <input
                    type="text"
                    placeholder="Search food..."
                    className="input input-bordered w-1/2"
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <div className='grid grid-cols-3 mx-auto mt-10 gap-10 max-w-7xl'>
                {allReviews.map(i => <ReviewCard key={i._id} i={i}></ReviewCard>)}
            </div>
        </div>
    );
};

export default AllReviews;
