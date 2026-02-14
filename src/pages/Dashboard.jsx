import { useEffect, useState } from "react";
import authService from "../appwrite/auth";

export default function Dashboard() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		authService.getCurrentUser()
      .then((data) => {
        console.log("Current user data:", data);
        if (data) {
          setUser(data);
        } else {
          console.error("No user data found");
        }
      }).catch((error) => console.error("Error fetching user data:", error.message));
	}, []);

	return <div>{user ? <h2>Welcome, {user.name}</h2> : <p>Loading...</p>}</div>;
}
