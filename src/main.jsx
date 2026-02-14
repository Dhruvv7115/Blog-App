import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import { Protected } from "./components";
import AddPost from "./pages/AddPost.jsx";
import Post from "./pages/Post.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: (
					<Protected authentication={false}>
						<Home />
					</Protected>
				),
			},
			{
				path: "/login",
				element: (
					<Protected authentication={false}>
						<Login />
					</Protected>
				),
			},
			{
				path: "/signup",
				element: (
					<Protected authentication={false}>
						<Signup />
					</Protected>
				),
			},
			{
				path: "/edit-post",
				element: (
					<Protected authentication>
						<EditPost />
					</Protected>
				),
			},
			{
				path: "/add-post",
				element: (
					<Protected authentication>
						<AddPost />
					</Protected>
				),
			},
			{
				path: "/all-posts",
				element: (
					<Protected authentication>
						<AllPosts />
					</Protected>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<Protected authentication>
						<EditPost />
					</Protected>
				),
			},
			{
				path: "/post/:slug",
				element: <Post />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);
