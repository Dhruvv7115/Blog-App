import React from "react";
import { Container, LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, List, CopyPlus, LogIn, LogOut, UserRoundPlus } from "lucide-react";

function Header() {
	const authStatus = useSelector((state) => state.auth.status);
	// console.log("authStatus:", authStatus);

	const navigate = useNavigate();

	const navItems = [
		{ name: "Home", href: "/", active: true, icon: <Home /> },
		{ name: "Login", href: "/login", active: !authStatus, icon: <LogIn /> },
		{ name: "Signup", href: "/signup", active: !authStatus, icon: <UserRoundPlus /> },
		{ name: "All Posts", href: "/all-posts", active: true, icon: <List /> },
		{ name: "Add Post", href: "/add-post", active: authStatus, icon: <CopyPlus /> },
	];

	return (
		<header className="p-4 shadow bg-[#fad02c] sticky top-0 right-0 left-0 z-1 w-full">
			<Container>
				<nav className="flex items-center justify-center mx-auto max-w-7xl px-4">
					<div className="mr-4">
						<Link to="/">
							<Logo width="100px" />
						</Link>
					</div>
					<ul className="md:hidden flex ml-auto fixed bottom-0 left-0 right-0 bg-[#fad02c] justify-around items-center gap-2 p-4 ">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name} className="flex flex-col items-center justify-center">
									<button
										onClick={() => navigate(item.href)}
										className="inline-bock px-6 py-2 duration-200 hover:text-white hover:bg-blue-950 rounded-full text-lg cursor-pointer"
									>
										{item.icon}
									</button>
									<span>{item.name}</span>	
								</li>
							) : null,
						)}
						{authStatus && (
							<li className="flex flex-col justify-center items-center">
								<button className="inline-bock px-6 py-2 duration-200 hover:text-white hover:bg-blue-950 rounded-full text-lg cursor-pointer">
									<LogOut />
								</button>
								<span>logout</span>
							</li>
						)}
					</ul>
					<ul className="hidden md:flex ml-auto gap-2">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.href)}
										className="inline-bock px-6 py-2 duration-200 hover:text-white hover:bg-blue-950 rounded-full text-lg cursor-pointer"
									>
										{item.name}
									</button>
								</li>
							) : null,
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
