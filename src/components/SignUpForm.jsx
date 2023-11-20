import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { setToken } from "../helpers";

const SignUpForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setUser } = useAuthContext();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const values = {
				username: username,
				email: email,
				password: password,
			};

			const response = await fetch(
				"http://localhost:1337/api/auth/local/register",
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
			<h3>SignUp Form</h3>
			<div>
				<input
					type='text'
					placeholder='username'
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
				<input
					type='text'
					placeholder='email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<input
					type='password'
					placeholder='password'
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
				<button onClick={handleSubmit}>Sign Up</button>
			</div>
		</>
	);
};

export default SignUpForm;
