import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogService from "../appwrite/blog";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";

export default function Post() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userData = useSelector((state) => state.auth.userData);

	const isAuthor = post && userData ? post.userId === userData.$id : false;

  const fetchPost = useCallback(async () => {
    if (slug) {
			const post = await blogService.getPost(slug);
      if (post) {
        setPost(post);
      } else navigate("/");
		} else navigate("/");
  }, [slug, navigate])
	useEffect(() => {
		fetchPost();
	}, [slug, navigate, fetchPost]);

	const deletePost = () => {
		blogService.deletePost(post.$id).then((status) => {
			if (status) {
				blogService.deleteFile(post.featuredImage).then(() => {
					dispatch(removePost(post.$id));
					navigate("/");
				}).catch(error => {
					console.error("Error deleting post image:", error);
					// Still remove from Redux even if file deletion fails
					dispatch(removePost(post.$id));
					navigate("/");
				});
			}
		}).catch(error => {
			console.error("Error deleting post:", error);
			throw error;
		});
	};

	return post ? (
		<div className="px-4 py-8 md:px-8 lg:px-16">
			<Container>
				<div className="w-full mx-auto p-4 bg-amber-50 shadow-lg rounded-2xl max-h-7xl flex flex-col items-center justify-center">
					<h1 className="text-4xl font-bold mb-6">{post.title}</h1>
					<img
						src={blogService.getFileView(post.featuredImage)}
						alt={post.title}
						className="w-full max-w-2xl h-auto rounded-md shadow-md mb-4 float-none md:float-left"
					/>
					<div className="browser-css flex flex-col justify-center items-center gap-4">
						{parse(post.content)}
					</div>

					{isAuthor && (
						<div className="mt-6 flex gap-4">
							<Link to={`/edit-post/${post.$id}`}>
								<Button bgColor="bg-green-500">Edit</Button>
							</Link>
							<Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
						</div>
					)}
				</div>
			</Container>
		</div>
	) : null;
}
