import { useState } from "react";
import AddTodoForm from "./AddTodoForm";


function TodoList() {
    const [todos, setTodos] = useState([
        {id: 1, title: 'Do the dishes', completed: false},
        {id: 2, title: 'Take out the trash', completed: false}
      ])

    const toggleCompletion = (id) => {
        setTodos(prev => prev.map(todo => {
            return todo.id === id ? {...todo, completed: !todo.completed} : todo
        }))
    }

    const deleteTodo = (id) => {
        setTodos(prev => [...prev.filter(todo => todo.id !== id)])
    }

    return (
        <div>
            <AddTodoForm setTodos={setTodos} />
            <h1>My todos:</h1>
            {todos.map(todo => {
                const {id, title, completed} = todo;
                return (
                    <div style={{display: "flex", gap: ".4rem"}} key={id}>
                        <label
                          style={{textDecoration: `${completed ? 'line-through' : 'none'}`}}
                        >
                            <input
                                type="checkbox"
                                onChange={() => toggleCompletion(id)}
                                checked={completed}
                            />
                            {title}
                        </label>
                        <button onClick={() => deleteTodo(id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoList;
