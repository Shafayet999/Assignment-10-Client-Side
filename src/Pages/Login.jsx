import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext} from 'react';
import { AuthContext } from "../ContextProviders/AuthContext";

const Login = () => {
 
    const {signInWithGoogleFunc, setUser, user, loading, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    // if (user) {
    //     navigate(location?.state || '/');
    //     return; 
    // }

    const handleGoogleSignin = () => {


        signInWithGoogleFunc()
            .then((res) => {

                setLoading(false);
                setUser(res.user);
                navigate(location?.state || '/');
                // toast.success("Signin successful");
            })
            .catch((e) => {
                // toast.error(e.message);
            });
    };
    console.log(user);
    return (
        <div className='flex justify-center items-center flex-col  space-y-10 mx-auto'>
            

            <div className="card w-full max-w-sm shrink-0 shadow-2xl p-5 mt-10">
                <h1 className='font-semibold text-4xl orrange text-center'>LogIn Here</h1>
                <div className="card-body">
                    <form
                    // onSubmit={handleSignin}
                    >
                        <fieldset className="fieldset">
                            {/* email */}
                            <label className="label orrange">Email</label>
                            <input
                                name="email"
                                type="email"
                                className="input orrange"
                                placeholder="Email"
                            // value={loginEmail}
                            // onChange={(e) => setLoginEmail(e.target.value)}
                            />




                            <div className='relative'>
                                {/* password */}
                                <label className="label orrange">Password</label>
                                <input name='password'
                                    // type={show ? "text" : "password"}

                                    className="input orrange" placeholder="Password" />
                                {/* <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-8 top-8 cursor-pointer z-50"
                                >
                                    {show ? <FaEye /> : <IoEyeOff />}
                                </span> */}
                            </div>


                            {/* buttons */}

                            <button type='submit' className="btn btn-neutral mt-4 bg-orrange orrange text-white border-none">Login</button>
                            <h2 className='font-semibold  text-center text-md pt-5'>Don't Have an Account? <Link className='orrange' to='/auth/register'>Register</Link> </h2>


                        </fieldset>

                    </form>
                    <button
                        onClick={handleGoogleSignin}
                        type="button"

                        className="btn btn-neutral mt-4 bg-orrange orrange text-white border-none"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>
            </div>
            {/* <ToastContainer position="top-center" autoClose={2000} /> */}

        </div>
    );
};

export default Login;
