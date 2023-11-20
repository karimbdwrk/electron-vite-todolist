import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getToken, removeToken } from "../helpers";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
	const [dataHeader, setDataHeader] = useState(null);
	const [loading, setLoading] = useState(false);

	const { user, setUser } = useAuthContext();

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					"http://localhost:1337/api/header?populate=*"
				);
				const dataJson = await response.json();
				setDataHeader(dataJson);
				setLoading(false);
				console.log(dataJson);
			} catch (error) {
				console.error("Erreur API :", error);
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const handleLogout = () => {
		removeToken();
		setUser();
	};

	return (
		<>
			<h1>Header</h1>
			{loading ? (
				<p>Loading ...</p>
			) : (
				<>
					{/* <img
						src={
							"http://localhost:1337" +
							dataHeader?.data.attributes.logo.data.attributes.url
						}
					/> */}
					<nav>
						<Link to='/'>Home</Link>
						{/* {dataHeader?.data.attributes.navigation.map(
							(navItem, id) => (
								<Link key={id} to={navItem.url}>
									{navItem.title}
								</Link>
							)
						)} */}
						{user ? (
							<>
								<Link to='/profile'>Profile</Link>
								<button onClick={handleLogout}>Log Out</button>
							</>
						) : (
							<>
								<Link to='/signin'>Sign In</Link>
								<Link to='/signup'>Sign Up</Link>
							</>
						)}
					</nav>
				</>
			)}
		</>
	);
};

export default Header;
