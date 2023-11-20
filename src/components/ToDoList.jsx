import React, { useState, useEffect } from "react";
import { Button } from "antd";
import {
	AiOutlineClose,
	AiOutlinePlus,
	AiOutlineExclamation,
	AiOutlineEdit,
	AiOutlineCheck,
} from "react-icons/ai";

import { styles } from "../styles/styles";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");
	const [editTask, setEditTask] = useState("");
	const [editIndex, setEditIndex] = useState(-1);

	useEffect(() => {
		const storedTodos = localStorage.getItem("todos");
		if (storedTodos != [] && storedTodos != "") {
			setTodos(JSON.parse(storedTodos));
		} else {
			setTodos([]);
			localStorage.setItem("todos", []);
		}
	}, []);

	useEffect(() => {
		console.log(todos);
	}, [todos]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (task != "") {
			const newTodos = [
				...todos,
				{
					title: task,
					isImportant: false,
				},
			];

			setTodos(newTodos);
			setTask("");
			localStorage.setItem("todos", JSON.stringify(newTodos));
		}
	};

	const handleDelete = (id) => {
		const updatedTodos = [...todos];
		updatedTodos.splice(id, 1);
		setTodos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	};

	const handleImportant = (id) => {
		const updatedTodos = [...todos];
		updatedTodos[id].isImportant = !updatedTodos[id].isImportant;
		setTodos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	};

	const handleEditIndex = (id) => {
		setEditTask(todos[id].title);
		setEditIndex(id);
	};

	const handleEdit = (id) => {
		if (editTask != "") {
			const updatedTodos = todos.map((todo, index) =>
				id === index ? { ...todo, title: editTask } : todo
			);
			setTodos(updatedTodos);
			setEditTask("");
			setEditIndex(-1);
			localStorage.setItem("todos", JSON.stringify(updatedTodos));
		}
	};

	return (
		<>
			<h1>ToDo List</h1>
			<div className='list'>
				{todos?.map((todo, id) => (
					<div
						key={id}
						style={
							todo.isImportant
								? styles.important
								: styles.notImportant
						}>
						{editIndex === id ? (
							<>
								<input
									type='text'
									value={editTask}
									onChange={(e) =>
										setEditTask(e.target.value)
									}
								/>
								<Button
									onClick={() => handleEdit(id)}
									type='primary'>
									<AiOutlineCheck />
								</Button>
							</>
						) : (
							<>
								<p>{todo.title}</p>
								<div>
									<button onClick={() => handleEditIndex(id)}>
										<AiOutlineEdit />
									</button>
									<button onClick={() => handleImportant(id)}>
										<AiOutlineExclamation />
									</button>
									<button onClick={() => handleDelete(id)}>
										<AiOutlineClose />
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
			<form>
				<input
					type='text'
					onChange={(e) => setTask(e.target.value)}
					value={task}
				/>
				<button
					style={task ? styles.button : styles.disabled}
					onClick={handleSubmit}>
					<AiOutlinePlus />
				</button>
			</form>
		</>
	);
};

export default ToDoList;
