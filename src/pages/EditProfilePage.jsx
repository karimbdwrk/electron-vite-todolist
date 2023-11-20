import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const EditProfilePage = () => {
	const { user, setUser } = useAuthContext();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const jwt = getToken();
	const navigate = useNavigate();

	useEffect(() => {
		setUsername(user?.username);
		setEmail(user?.email);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const values = {
			username: username,
			email: email,
		};

		try {
			const response = await fetch(
				`http://localhost:1337/api/users/${user.id}`,
				{
					method: "PUT",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify(values),
				}
			);

			const data = await response.json();

			if (data?.error) {
				throw data?.error;
			} else {
				setUser(data);
				setError("");
				navigate("/profile", { replace: true });
			}
		} catch (error) {
			console.error(error);
			setError(error?.message ?? "Probleme !");
		}
	};

	return (
		<>
			<h3>Edit profile : {user?.id}</h3>
			<form>
				<input
					type='text'
					placeholder='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type='text'
					placeholder='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button onClick={handleSubmit}>Edit</button>
			</form>
			<p>{error}</p>
		</>
	);
};

export default EditProfilePage;
