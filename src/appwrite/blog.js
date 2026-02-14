import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../configs/config";

class BlogService {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				},
			);
		} catch (error) {
			console.log("Appwrite Error creating a post: ", error);
			throw error;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				},
			);
		} catch (error) {
			console.log("Appwrite Error updating a post: ", error);
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			return await this.databases.deleteDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
			);
		} catch (error) {
			console.log("Appwrite Error in deleting the post: ", error);
			throw error;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
			);
		} catch (error) {
			console.log("Appwrite Error in getting the document: ", error);
			throw error;
		}
	}

	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				queries,
			);
		} catch (error) {
			console.log("Appwrite Error in getting the document: ", error);
			throw error;
		}
	}

	// file upload services
	async uploadFile(file) {
		try {
			const uploadedFile = await this.storage.createFile(config.appwriteBucketId, ID.unique(), file);
			return uploadedFile;
		} catch (error) {
			console.log("Appwrite Error in uploading image: ", error);
			return false;
		}
	}

	async deleteFile(file) {
		try {
			await this.storage.deleteFile(config.appwriteBucketId, file);
			return true;
		} catch (error) {
			console.log("Appwrite Error in deleting the image: ", error);
			return false;
		}
	}

	getFilePreview(file) {
		return this.storage.getFilePreview(config.appwriteBucketId, file);
	}
	getFileView(file) {
		return this.storage.getFileView(config.appwriteBucketId, file);
	}
}

const blogService = new BlogService();

export default blogService;
