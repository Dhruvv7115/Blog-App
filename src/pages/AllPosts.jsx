import { Query } from "appwrite";
import blogService from "../appwrite/blog";
import React, { useState, useEffect, useCallback } from "react";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice";

export default function AllPosts() {
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.auth);
	const posts = useSelector((state) => state.posts.posts);
	const dispatch = useDispatch();
	
	const fetchPosts = useCallback(async () => {
		if (user.status) {
			if (posts.length === 0) {
				console.log("No posts in state, fetching from API...");
				setLoading(true);
				try {
					const response = await blogService.getPosts([ 
						Query.equal("userId", user.userData.$id),
						Query.limit(12),
					]);
					if (response) {
						dispatch(setPosts(response.documents));
					}
				} catch (error) {
					console.error("Error fetching posts:", error);
				} finally {
					setLoading(false);
				}
			} else {
				console.log("Posts found in state:", posts.length);
			  
			}
		}
	}, [user.status, posts.length, dispatch]);
	
	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	if (loading) {
		return (
			<div className="w-full py-8">
				<Container>
					<div className="text-center">Loading posts...</div>
				</Container>
			</div>
		);
	}

	if (posts.length > 0) {
		return (
			<div className="w-full py-8">
				<Container>
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
				</Container>
			</div>
		);
	} else {
		if (user.status) {
			return (
				<div className="w-full py-8">
					<Container>
						<div className="text-center">No posts available</div>
					</Container>
				</div>
			);
		} else {
			return (
				<div className="w-full py-8">
					<Container>
						<div className="text-center">Please login to view your posts</div>
					</Container>
				</div>
			);
		}
	}
}
