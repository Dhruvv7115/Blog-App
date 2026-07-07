import React from "react";
import { Link } from "react-router-dom";
import blogService from "../appwrite/blog";

function PostCard({ $id, title, featuredImage }) {
	return (
		<div>
			<div className="bg-amber-300 p-1.5 w-full hover:shadow-2xl duration-200 rounded-2xl hover:-translate-y-2 min-h-full flex flex-col justify-around">
				<img
					src={blogService.getFileView(featuredImage)}
					alt={title}
					className="w-full mb-6 rounded-2xl object-cover h-64"
				/>
				<h1 className="text-lg font-semibold text-blue-950 mx-2">{title}</h1>

				<button className="px-4 py-1 mx-2 mt-4 mb-2 bg-blue-900 rounded-full text-amber-100 w-fit text-sm cursor-pointer">
					<Link to={`/post/${$id}`}>Explore</Link>
				</button>
			</div>
		</div>
	);
}

export default PostCard;
