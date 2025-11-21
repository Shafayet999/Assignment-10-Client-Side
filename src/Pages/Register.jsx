import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className='flex justify-center items-center flex-col space-y-5 mx-auto'>
      
      <div className="card w-full max-w-sm shrink-0 shadow-2xl p-4">
        
        <h1 className='font-semibold text-4xl orrange text-center'>Register Here</h1>
        
        <div className="card-body">
          <form>
            <fieldset className="fieldset">

              {/* Name */}
              <label className="label orrange">Full Name</label>
              <input
                name="name"
                type="text"
                className="input orrange"
                placeholder="Your Name"
              />

              {/* Email */}
              <label className="label orrange">Email</label>
              <input
                name="email"
                type="email"
                className="input orrange"
                placeholder="Email"
              />

              {/* Password */}
              <label className="label orrange">Password</label>
              <input
                name="password"
                type="password"
                className="input orrange"
                placeholder="Password"
              />

              {/* Repeat Password */}
              <label className="label orrange">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="input orrange"
                placeholder="Confirm Password"
              />

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-neutral mt-4 bg-orrange orrange text-white border-none"
              >
                Register
              </button>

              {/* Already have an account? */}
              <h2 className='font-semibold text-center text-md pt-5'>
                Already Have an Account?{" "}
                <Link className='orrange' to='/auth/login'>Login</Link>
              </h2>
            </fieldset>
          </form>

          {/* Google Login */}
          <button
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

    </div>
  );
};

export default Register;
