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
		<div className="px-4 md:px-8 lg:px-16">
			<Container>
				<div className="w-full md:max-w-4xl mx-auto bg-amber-100 flex flex-col items-center justify-center md:px-24 py-6">
					<img
						src={blogService.getFileView(post.featuredImage)}
						alt={post.title}
						className="w-full h-96 object-cover rounded-md shadow-md mb-4 float-none md:float-left"
					/>
					<h1 className="text-4xl font-bold my-6 text-start w-full py-2">{post.title}</h1>
					<div className="flex flex-col items-stretch justify-stretch text-start w-full prose prose-base max-w-none py-4">
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
