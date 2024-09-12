import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../utils/Spinner";
import useAuth from "../../hooks/useAuth";
import "./Signin.css";

// Input component to render form input fields with error handling
const Input = ({ type, placeholder, error, register, name }) => (
  <div className="cant">
    <input
      type={type}
      placeholder={placeholder}
      className={error ? "error" : ""}
      {...register(name, { required: true })}
    />
    {error && error.type === "required" && <span>Can't be empty</span>}
  </div>
);

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Using react-hook-form for form handling

  const { handleSignInUser, authenticating } = useAuth(); // Custom hook for authentication

  const btnText = authenticating ? <Spinner /> : "Login to your account"; // Display spinner if authenticating

  const onSubmit = (data) => {
    handleSignInUser(data); // Handle form submission
  };

  return (
    <div className="signin">
      <form className="in-form" onSubmit={handleSubmit(onSubmit)} action="">
        <h1 className="in-title">Login</h1>
        <div className="in-input">
          {/* Email input field */}
          <Input
            type="text"
            placeholder="Email address"
            error={errors.email}
            register={register}
            name="email"
          />
          {/* Password input field */}
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            error={errors.password}
            register={register}
            name="password"
          />
          {/* Toggle password visibility */}

          {/* <button
            className="show-us"
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button> */}

          {/* Submit button */}
          <button disabled={authenticating}>{btnText}</button>
        </div>
        {/* Link to sign up page */}
        <div className="dont">
          <p className="mb-0">Don't have an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
