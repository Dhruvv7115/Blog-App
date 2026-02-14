import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import blogService from "../appwrite/blog";
import { Button, Select, RTE, Input } from "./index";
import { useForm } from "react-hook-form";
import { addPost, updatePost } from "../store/postSlice";

export default function PostForm({ post }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(post);
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				content: post?.content || "",
				slug: post?.slug || "",
				status: post?.status || "active",
			},
		});
	const userData = useSelector((state) => state.auth.userData);
	console.log(userData)

	const submit = async (data) => {
		console.log(data);
		const { image, ...postData } = data; // Extract image and get the rest
		console.log(image?.[0])

		if (post) {
			console.log(post.featuredImage);
			const file = image?.[0] ? await blogService.uploadFile(image[0]) : null;

			if (file) {
				await blogService.deleteFile(post.featuredImage);
			}

			const updatedPost = await blogService.updatePost(post.$id, {
				...postData,
				featuredImage: file ? file?.$id : post.featuredImage,
			});

			if (updatedPost) {
				dispatch(updatePost(updatedPost));
				navigate(`/post/${updatedPost.$id}`);
			}
		} else {
			const file = image?.[0] ? await blogService.uploadFile(image[0]) : null;
			console.log(file);

			if (file) {
				postData.featuredImage = file.$id;
				console.log(postData);
			}
			console.log(userData);

			const newPost = await blogService.createPost({ ...postData, userId: userData.$id });

			if (newPost) {
				dispatch(addPost(newPost));
				navigate(`/post/${newPost.$id}`);
			}
		}
	}

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string") {
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]/g, "")
				.replace(/\s+/g, "-");
		}
		return "";
	}, []);

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title, { shouldValidate: true }));
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [watch, slugTransform, setValue]);

	return (
		<form
			onSubmit={handleSubmit(submit)}
			className="flex flex-wrap md:flex-row"
		>
			<div className="md:w-2/3 w-full px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.target.value), {
							shouldValidate: true,
						});
					}}
					value={post?.slug || getValues("slug") || ""}
				/>

				<RTE
					label="Content :"
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="md:w-1/3 w-full px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={blogService.getFileView(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
				>
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	);
}