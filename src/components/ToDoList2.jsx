import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'
import {
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineExclamation,
  AiOutlineEdit,
  AiOutlineCheck
} from 'react-icons/ai'
import { getToken } from '../helpers'

import { styles } from '../styles/styles'

const ToDoList2 = () => {
  const [name, setName] = useState('')
  const [todolist, setTodolist] = useState(null)
  const [task, setTask] = useState('')
  const [editTask, setEditTask] = useState('')
  const [editIndex, setEditIndex] = useState(-1)
  const [loading, setLoading] = useState(false)

  const jwt = getToken()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/todolists/${id}?populate=*`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      const dataJson = await response.json()
      setTodolist(dataJson.data)
      setName(dataJson.data.attributes.title)
      setLoading(false)
      console.log(dataJson.data)
    } catch (error) {
      console.error('Erreur API :', error)
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('task', task)

    const newTodo = task
    const body = {
      data: {
        title: newTodo,
        todolist: {
          id: id
        }
      }
    }

    fetch('http://localhost:1337/api/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    }).then(() => {
      setTask('')
      fetchData()
    })
  }

  const handleDelete = (id) => {
    console.log('handle delete', id)
    fetch(`http://localhost:1337/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    }).then(() => {
      fetchData()
    })
  }

  const handleEditIndex = (id) => {
    setEditIndex(id)
    const filtre = todolist.attributes.todos.data.filter((todo) => todo.id === id)
    const taskToEdit = filtre[0].attributes.title
    setEditTask(taskToEdit)
  }

  const handleEdit = (id) => {
    const newTodo = editTask
    const body = {
      data: {
        title: newTodo
      }
    }

    fetch(`http://localhost:1337/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    }).then(() => {
      setEditTask('')
      setEditIndex(-1)
      fetchData()
    })
  }

  const handleImportant = (id) => {
    const filtre = todolist.attributes.todos.data.filter((todo) => todo.id === id)
    const bool = filtre[0].attributes.isImportant
    const body = {
      data: {
        isImportant: !bool
      }
    }
    fetch(`http://localhost:1337/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(body)
    }).then(() => {
      fetchData()
    })
  }

  return (
    <>
      <h1>{name}</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          {todolist?.attributes.todos.data.map((todo, id) => (
            <div
              style={todo.attributes.isImportant ? styles.important : styles.notImportant}
              key={id}
            >
              {editIndex === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <Button onClick={() => handleEdit(todo.id)} type="primary">
                    <AiOutlineCheck />
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <p>{todo.attributes.title}</p>
                    <div>
                      <button onClick={() => handleEditIndex(todo.id)}>
                        <AiOutlineEdit />
                      </button>
                      <button onClick={() => handleImportant(todo.id)}>
                        <AiOutlineExclamation />
                      </button>
                      <button onClick={() => handleDelete(todo.id)}>
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
          <form>
            <input type="text" onChange={(e) => setTask(e.target.value)} value={task} />
            <button style={task ? styles.button : styles.disabled} onClick={handleSubmit}>
              <AiOutlinePlus />
            </button>
          </form>
        </>
      )}
    </>
  )
}

export default ToDoList2
