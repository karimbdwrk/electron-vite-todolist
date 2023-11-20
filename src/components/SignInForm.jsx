import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../helpers";

const SignInForm = () => {
	const [identifier, setIdentifier] = useState("");
	const [password, setPassword] = useState("");

	const { setUser } = useAuthContext();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const values = {
				identifier: identifier,
				password: password,
			};

			const response = await fetch(
				"http://localhost:1337/api/auth/local",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(values),
				}
			);

			const data = await response.json();
			console.log(data);
			// localStorage.setItem("jwt", data.jwt);
			setToken(data.jwt);
			setUser(data.user);
			navigate("/", { replace: true });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<h3>SignIn Form</h3>
			<div>
				<input
					type='text'
					placeholder='identifier'
					onChange={(e) => setIdentifier(e.target.value)}
					value={identifier}
				/>
				<input
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button onClick={handleSubmit}>Sign In</button>
			</div>
		</>
	);
};

export default SignInForm;
