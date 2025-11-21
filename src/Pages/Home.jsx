import React, { use, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReviewCard from '../Components/ReviewCard';
import { Link } from 'react-router';
import { AuthContext } from '../ContextProviders/AuthContext';
import Loading from '../Components/Loading';


const Home = () => {

    const {user, loading} = use(AuthContext);

    const slides = [
        {
            text: "Taste the Magic, Love the Flavor.",
            img: "https://plus.unsplash.com/premium_photo-1691095182210-a1b3c46a31d6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            text: "Fresh Ingredients, Real Happiness",
            img: "https://images.unsplash.com/photo-1762883469122-c15463bbce28?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            text: "Good Food. Good Mood",
            img: "https://plus.unsplash.com/premium_photo-1682096489563-bec7c2ad27fa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            text: "Discover the Chef Inside You",
            img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=677&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/topReviews")
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.log(err));
    }, []);

    if (loading || reviews.length === 0) {
        return <Loading />;
    }
     
    return (
        <div>
            <div className="w-full mb-12 mt-10">
                <Swiper


                    autoplay={{ delay: 1500, }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}

                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
                                style={{
                                    backgroundImage: `url(${slide.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",

                                }}
                            >
                                <div className="absolute inset-0 bg-black/20"></div>

                                <h2 className="relative text-white text-3xl md:text-5xl font-bold text-center px-6 drop-shadow-xl">
                                    {slide.text}
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            <h1 className='text-center mt-10 font-semibold text-3xl orrange'>6 Top Rated Reviews</h1>
            <div className='grid grid-cols-3 mx-30 mt-10 gap-20'>
                {
                    reviews.map(i => <ReviewCard key={i._id} i={i}></ReviewCard>)
                }
            </div>


            <div className="flex justify-center">
                <Link
                    to="/allReviews"
                    className="btn mt-10 bg-orrange text-white flex w-60 justify-center items-center border-none transition-transform duration-300 hover:scale-105 hover:shadow"
                >
                    Show All Reviews
                </Link>
            </div>



            {/* Additional Section 1 */}
            <section className="max-w-6xl mx-auto px-4 mt-20">
                <h2 className="text-3xl md:text-4xl font-bold text-center orrange mb-10">
                    Why People Love FoodLovers?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="p-6 shadow-lg rounded-xl bg-white text-center">
                        <span className="text-5xl block mb-3">🍽️</span>
                        <h3 className="text-xl font-semibold orrange mb-2">Authentic Reviews</h3>
                        <p className="text-gray-600">All food reviews come from real people with real experiences.</p>
                    </div>

                    <div className="p-6 shadow-lg rounded-xl bg-white text-center">
                        <span className="text-5xl block mb-3">⭐</span>
                        <h3 className="text-xl font-semibold orrange mb-2">Top Rated Restaurants</h3>
                        <p className="text-gray-600">Discover the best restaurants in your city based on honest ratings.</p>
                    </div>

                    <div className="p-6 shadow-lg rounded-xl bg-white text-center">
                        <span className="text-5xl block mb-3">🚀</span>
                        <h3 className="text-xl font-semibold orrange mb-2">Fast & Clean Interface</h3>
                        <p className="text-gray-600">Smooth user experience with simple and modern UI design.</p>
                    </div>

                </div>
            </section>


            {/* Additional Section 2 */}
            <section className="max-w-6xl mx-auto px-4 mt-20 mb-5">
                <h2 className="text-3xl md:text-4xl font-bold text-center orrange mb-10">
                    Popular Categories
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                        <span className="text-5xl mb-2 block">🍔</span>
                        <p className="font-semibold text-gray-700">Burgers</p>
                    </div>

                    <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                        <span className="text-5xl mb-2 block">🍕</span>
                        <p className="font-semibold text-gray-700">Pizzas</p>
                    </div>

                    <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                        <span className="text-5xl mb-2 block">🍣</span>
                        <p className="font-semibold text-gray-700">Sushi</p>
                    </div>

                    <div className="p-6 bg-white shadow-md rounded-xl hover:shadow-xl transition">
                        <span className="text-5xl mb-2 block">🍝</span>
                        <p className="font-semibold text-gray-700">Pasta</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Home;
