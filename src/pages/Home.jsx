import React, { useState, useEffect } from "react";
import blogService from "../appwrite/blog";
import { Container, PostCard } from "../components";
import { Query } from "appwrite";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchPosts = async () => {
		const posts = await blogService.getPosts([
			Query.equal("status", "active"),
			Query.limit(12),
		]);
		console.log(posts);
		if (posts) {
			setPosts(posts.documents);
			setLoading(false);
		}else{
			setPosts([]);
			setLoading(false);
		}
	};

	useEffect(() => {
		console.log("fetching posts");
		fetchPosts();
	}, []);

	if(loading){
		console.log("loading...")
		return (
			<div className="py-8">
				<Container>
					<h1 className="text-2xl font-bold text-center">Loading...</h1>
				</Container>
			</div>
		)
	}

	if(posts.length <= 0){
		return (
			<div className="py-8">
				<Container>
					<h1 className="text-2xl font-bold text-center">No Posts Available</h1>
				</Container>
			</div>
		);
	}

	return (
		<div className="w-full py-8 h-full">
			<Container>
				{posts ? (
					<div className="flex flex-wrap justify-center md:justify-start">
						{posts.map((post) => (
							<div
								key={post.$id}
								className="max-w-xl w-full md:w-1/2 lg:w-1/3 p-4"
							>
								<PostCard {...post} />
							</div>
						))}
					</div>
				) : (
					<div className="text-center">No posts available</div>
				)}
			</Container>
		</div>
	);
}
