import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../ContextProviders/AuthContext";
import { updateProfile } from "firebase/auth";
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { toast } from "react-toastify";

const Register = () => {

  const { signInWithGoogle, createUser, setLoading, setUser, user, loading } = use(AuthContext);
  const [passwordError, setPasswordError] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [confirmError, setConfirmError] = useState("");


  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // reset previous errors
    setPasswordError("");
    setConfirmError("");

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match!");
      return;
    }

    // Password validation rules
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long!");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must include at least one uppercase letter!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must include at least one lowercase letter!");
      return;
    }

    // Create user
    createUser(email, password)
      .then((res) => {
        const currentUser = res.user;

        // Profile update
        updateProfile(currentUser, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({
              ...currentUser,
              displayName: name,
              photoURL: photo,
            });

            toast.success("Account created successfully!");
            form.reset();
            navigate("/");
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGoogleSignin = () => {

    signInWithGoogle()
      .then((res) => {
        setLoading(false);
        setUser(res.user);
        navigate(location?.state || '/');
        toast.success("Signin successful");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className='flex justify-center items-center flex-col space-y-5 mx-auto'>

      <div className="card w-full max-w-sm shrink-0 shadow-2xl p-4">

        <h1 className='font-semibold text-4xl orrange text-center'>Register Here</h1>

        <div className="card-body">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">

              <label className="label orrange">Name</label>
              <input name='name' type="text" className="input orrange" placeholder="Name" required />

              <label className="label orrange">Photo URL</label>
              <input name='photo' type="text" className="input orrange" placeholder="Photo URL" required />

              <label className="label orrange">Email</label>
              <input name='email' type="email" className="input orrange" placeholder="Email" required />

              <div className='relative'>
                <label className="label orrange">Password</label>
                <input name='password' type={show ? "text" : "password"} className="input orrange" placeholder="Password" required />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-8 top-8 cursor-pointer z-50"
                >
                  {show ? <FaEye className="orrange" /> : <IoEyeOff className="orrange" />}
                </span>
              </div>

              {/* Repeat Password */}
              <label className="label orrange">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="input orrange"
                placeholder="Confirm Password"
              />

              {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}

              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              {successMsg && <p className="text-green-500 text-sm mt-1">{successMsg}</p>}

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
          <button onClick={handleGoogleSignin}
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
