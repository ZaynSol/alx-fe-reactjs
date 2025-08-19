import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';

test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText(/My todos:/i)).toBeInTheDocument();
    expect(screen.getAllByText('Delete')[0]).toBeInTheDocument();
});

test('adds new todo', () => {
    const setTodos = jest.fn();

    render(<AddTodoForm setTodos={setTodos} />);

    const input = screen.getByPlaceholderText('To do title');
    const button = screen.getByText('Add Todo');

    fireEvent.change(input, { target: { value: 'New Todo' } });

    fireEvent.click(button);

    expect(setTodos).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setTodos.mock.calls[0][0];

    const newTodos = updateFunction([]);
    expect(newTodos).toHaveLength(1);
    expect(newTodos[0]).toEqual({
        id: expect.any(Number),
        title: 'New Todo',
        completed: false
    });
});

test('toggles todo', () => {
    render(<TodoList />);

    const checkbox = screen.getByLabelText('Do the dishes');

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
})

test('deletes a todo item', () => {
    render(<TodoList />);

    const deleteButton = screen.getAllByText('Delete')[0];

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Do the dishes')).not.toBeInTheDocument();

    expect(screen.getByText('Take out the trash')).toBeInTheDocument();
});
