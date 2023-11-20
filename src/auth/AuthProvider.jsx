import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";

const AuthProvider = ({ children }) => {
	const [userData, setUserData] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const authToken = getToken();

	const fetchLoggedInUser = async (token) => {
		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:1337/api/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			setUserData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUser = (user) => {
		setUserData(user);
	};

	useEffect(() => {
		if (authToken) {
			fetchLoggedInUser(authToken);
		}
	}, [authToken]);

	return (
		<AuthContext.Provider
			value={{ user: userData, setUser: handleUser, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
