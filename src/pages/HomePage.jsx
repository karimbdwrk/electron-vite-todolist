import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { getToken } from "../helpers";

const HomePage = () => {
	const [listName, setListName] = useState("");
	const [lists, setLists] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user } = useAuthContext();
	const jwt = getToken();

	useEffect(() => {
		setLoading(true);
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(
				"http://localhost:1337/api/users/me?populate=*",
				{
					method: "GET",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				}
			);
			const dataJson = await response.json();
			setLists(dataJson.todolists);
			setLoading(false);
			console.log(dataJson.todolists);
		} catch (error) {
			console.error("Erreur API :", error);
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const values = {
			data: {
				title: listName,
				users_permissions_user: {
					id: user.id,
				},
			},
		};

		try {
			const response = await fetch(
				"http://localhost:1337/api/todolists",
				{
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
					body: JSON.stringify(values),
				}
			);
			const dataJson = await response.json();
			console.log(dataJson);
			setListName("");
			fetchData();
		} catch (error) {
			console.error("Erreur API :", error);
		}
	};

	return (
		<>
			<h1>
				Hello {user?.username} - {user?.id}
			</h1>
			<div className='lists'>
				{user &&
					lists.map((list, id) => (
						<Link key={id} to={`/todolist/${list.id}`}>
							<div className='card'>
								<h3>{list.title}</h3>
							</div>
						</Link>
					))}
			</div>
			{user && (
				<div>
					<form>
						<input
							value={listName}
							onChange={(e) => setListName(e.target.value)}
						/>
						<button onClick={handleSubmit}>
							Add new todolist !
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default HomePage;
