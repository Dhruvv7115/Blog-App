import React, { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";
function Login() {
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const login = async (data) => {
		setError("");
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) {
					dispatch(authLogin(userData));
					navigate("/");
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	const handleGoogleSignin = async () => {
		try {
			// Don't await the OAuth call as it redirects immediately
			authService.loginWithGoogle();
		} catch (error) {
			setError(error.message);
			console.error("Google signin error:", error);
		}
	}
	useEffect(() => {
		authService.getCurrentSession().then((session) => {
			console.log(session)
		});
	}, [])

	return (
		<div className="flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign Up
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				{/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
				<form
					onSubmit={handleSubmit(login)}
					className="mt-8"
				>
					<div className="space-y-5">
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							/* register your input into the hook by invoking the "register" function 
          include validation with required or other standard HTML validation rules */
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Invalid email address",
								},
							})}
						/>
						<Input
							label="Password: "
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: "Password is required",
							})}
						/>
						<Button
							type="submit"
							className="w-full"
						>
							Sign in
						</Button>
					</div>
				</form>
				<div className="mt-6 relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300" />
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="bg-gray-100 px-2 text-gray-500">or sign in with</span>
					</div>
				</div>
				<div className="mt-6">
					<Button
						type="button"
						className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
						onClick={handleGoogleSignin}
					>
						<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
						<span className="text-black">Continue with Google</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login;
