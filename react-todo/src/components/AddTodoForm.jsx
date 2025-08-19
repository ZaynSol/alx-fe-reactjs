import { useState } from "react";


function AddTodoForm({setTodos}) {
    const [title, setTitle] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        if (!title.trim().length) {
            alert("Todo title can't be empty!");
            return
        }
        const newTodo = {id: Date.now(), title, completed: false};
        setTodos(prev => [...prev, newTodo]);
        setTitle('');
    }

    return (
        <form onSubmit={addTodo}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="To do title"
            />
            <button type="submit">Add Todo</button>
        </form>
    )
}

export default AddTodoForm;
