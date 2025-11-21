import React, { use, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReviewCard from "../Components/ReviewCard";
import { Link } from "react-router";
import { AuthContext } from "../ContextProviders/AuthContext";
import Loading from "../Components/Loading";

const Home = () => {
    const { loading } = use(AuthContext);
    const [reviews, setReviews] = useState([]);

    const slides = [
        {
            text: "Taste the Magic, Love the Flavor.",
            img: "https://plus.unsplash.com/premium_photo-1691095182210-a1b3c46a31d6?q=80&w=687&auto=format&fit=crop",
        },
        {
            text: "Fresh Ingredients, Real Happiness",
            img: "https://images.unsplash.com/photo-1762883469122-c15463bbce28?q=80&w=627&auto=format&fit=crop",
        },
        {
            text: "Good Food. Good Mood",
            img: "https://plus.unsplash.com/premium_photo-1682096489563-bec7c2ad27fa?q=80&w=1470&auto=format&fit=crop",
        },
        {
            text: "Discover the Chef Inside You",
            img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=677&auto=format&fit=crop",
        },
    ];

    useEffect(() => {
        fetch("http://localhost:3000/topReviews")
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((err) => console.log(err));
    }, []);

    if (loading || reviews.length === 0) return <Loading />;

    return (
        <div className="w-full">

            {/* HERO SLIDER */}
            <div className="w-11/12 mx-auto md:w-full mb-10 mt-10">
                <Swiper
                    autoplay={{ delay: 2000 }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="rounded-xl overflow-hidden"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] flex items-center justify-center"
                                style={{
                                    backgroundImage: `url(${slide.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="absolute inset-0 bg-black/20"></div>

                                <h2 className="relative text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-xl">
                                    {slide.text}
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* TOP REVIEWS */}
            <h1 className="text-center mt-10 font-semibold text-2xl md:text-3xl orrange">
                ⭐ Top Rated Reviews
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4 mt-10">
                {reviews.map((i) => (
                    <ReviewCard key={i._id} i={i} />
                ))}
            </div>

            <div className="flex justify-center">
                <Link
                    to="/allReviews"
                    className="btn mt-10 mb-5 bg-orrange text-white w-52 border-none hover:scale-105 transition"
                >
                    Show All Reviews
                </Link>
            </div>

            {/* WHY PEOPLE LOVE US SECTION */}
            <section className="max-w-6xl mx-auto px-4 mt-20">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center orrange mb-10">
                    Why People Love FoodLovers?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:shadow-xl transition">
                        <span className="text-5xl">🍽️</span>
                        <h3 className="text-xl font-semibold orrange mt-3">Authentic Reviews</h3>
                        <p className="text-gray-600 mt-2">
                            Reviews from real food lovers with real experiences.
                        </p>
                    </div>

                    <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:shadow-xl transition">
                        <span className="text-5xl">⭐</span>
                        <h3 className="text-xl font-semibold orrange mt-3">Top Rated Spots</h3>
                        <p className="text-gray-600 mt-2">
                            Find the highest-rated places in your city.
                        </p>
                    </div>

                    <div className="p-6 shadow-lg rounded-xl bg-white text-center hover:shadow-xl transition">
                        <span className="text-5xl">🚀</span>
                        <h3 className="text-xl font-semibold orrange mt-3">Smooth Experience</h3>
                        <p className="text-gray-600 mt-2">
                            Simple, modern and fast user interface.
                        </p>
                    </div>
                </div>
            </section>

            {/* POPULAR CATEGORIES */}
            <section className="max-w-6xl mx-auto px-4 mt-20 mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center orrange mb-8">
                    Popular Categories
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
                    {[
                        ["🍔", "Burgers"],
                        ["🍕", "Pizzas"],
                        ["🍣", "Sushi"],
                        ["🍝", "Pasta"],
                    ].map(([icon, name], i) => (
                        <div
                            key={i}
                            className="p-5 bg-white shadow-md rounded-xl hover:shadow-xl transition"
                        >
                            <span className="text-5xl">{icon}</span>
                            <p className="font-semibold text-gray-700 mt-2">{name}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
