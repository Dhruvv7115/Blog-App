import { Client, Account, ID, OAuthProvider } from "appwrite";
import config from "../configs/config";
class AuthService {
	client = new Client();
	account;
	constructor() {
		this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name,
			);
			if (userAccount) {
				// call login function
				return this.login({ email, password });
			} else {
				return null;
			}
		} catch (error) {
			console.log("Appwrite account creation error:", error);
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.log("Appwrite login error:", error);
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return this.account.get();
		} catch (error) {
			console.log("Appwrite get current user error:", error.message);
			throw error;
		}
	}

	async logout() {
		try {
			await this.account.deleteSession("current");
		} catch (error) {
			console.error("Error logging out: ", error);
			throw error;
		}
	}
	async logoutAll() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			console.error("Error logging out: ", error);
			throw error;
		}
	}

	async loginWithGoogle() {
		try {
			this.account.createOAuth2Session(
				OAuthProvider.Google,
				"http://localhost:5173/all-posts", // Success URL
				"http://localhost:5173/login", // Failure URL
        ["openid", "email", "profile"],
			);
		} catch (error) {
			console.log("Appwrite OAuth login error:", error);
			throw error;
		}
	}
	async getCurrentSession() {
		try {
			const response = await this.account.getSession("current");
			console.log("Current session:", response);
			return response;
		} catch (error) {
			if (
				!error.message.includes("missing scope") &&
				!error.message.includes("Unauthorized") &&
				error.code !== 401
			) {
				console.log("Unexpected session error:", error);
			}
		}
	}
}
const authService = new AuthService();

export default authService;
