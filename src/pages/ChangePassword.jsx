import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const ChangePassword = () => {
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const { user } = useAuthContext();
	const jwt = getToken();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const values = {
			password: password,
		};

		if (password && password2 && password === password2) {
			try {
				const response = await fetch(
					`http://localhost:1337/api/users/${user.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${jwt}`,
						},
						body: JSON.stringify(values),
					}
				);
				const data = await response.json();
				if (data?.error) {
					throw data?.error;
				} else {
					console.log(data);
					// setUser(data);
					setError(error?.message ?? "");
					navigate("/profile", { replace: true });
				}
			} catch (error) {
				console.error(error);
				setError(error?.message ?? "Something went wrong!");
			}
		} else {
			setError("Not same password!");
		}
	};

	return (
		<>
			<h1>Change password</h1>
			<p>{error}</p>
			<form>
				<input
					type='text'
					placeholder='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type='text'
					placeholder='confirm password'
					value={password2}
					onChange={(e) => setPassword2(e.target.value)}
				/>
				<button onClick={handleSubmit}>Update</button>
			</form>
		</>
	);
};

export default ChangePassword;
