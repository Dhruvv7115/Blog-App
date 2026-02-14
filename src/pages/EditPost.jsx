import React, { useState, useEffect, useCallback } from "react";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import blogService from "../appwrite/blog";


export default function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();

	const getPost = useCallback(async () => {
		if (slug) {
			const post = await blogService.getPost(slug);
			if (post) setPost(post);
		} else {
			navigate("/");
		}
	}, [slug, navigate]);

	useEffect(() => {
		getPost();
	}, [slug, navigate, getPost]);

	return post ? (
		<div className="py-8">
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null;
}
