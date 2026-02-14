import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { Input, Button, Logo } from "./index";

function Signup() {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();

	const signup = async (data) => {
		setError("");
		try {
			const session = await authService.createAccount(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				console.log(userData)
				if (userData) {
					dispatch(authLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const handleGoogleSignup = () => {
		try {
			// Don't await the OAuth call as it redirects immediately
			authService.loginWithGoogle();
			// Remove the navigate call as OAuth handles redirection
		} catch (error) {
			setError(error.message);
			console.error("Google signin error:", error);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div className="mx-auto w-full max-w-lg bg-amber-50 shadow-2xl rounded-xl p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="mb-2 text-center text-3xl font-bold text-gray-700">
					Sign up 
				</h2>
				<p className="mb-8 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-blue-600 hover:underline"
					>
						Login
					</Link>
				</p>
				{error && (
					<p className="mt-4 text-center text-sm text-red-500">{error}</p>
				)}
				<form onSubmit={handleSubmit(signup)}>
					<div className="space-y-4">
						<Input
							label="Name: "
							type="text"
							placeholder="Enter your name"
							{...register("name", { required: "Name is required" })}
						/>
						<Input
							label="Email: "
							type="email"
							placeholder="Enter your email"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address",
								},
							})}
						/>
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							{...register("password", { required: "Password is required" })}
						/>
					</div>
					<div className="mt-6">
						<Button type="submit">Sign up</Button>
					</div>
				</form>
				<div className="mt-6 relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-gray-100 px-2 text-gray-500">or sign up with</span>
					</div>
				</div>

				<div className="mt-6">
					<Button
						type="button"
						className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
						onClick={handleGoogleSignup}
					>
						<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
						<span className="text-black">Continue with Google</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Signup;
