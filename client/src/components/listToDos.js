import React, { useEffect, useState } from "react";
import EditTodo from "./editToDo";

const ListTodos = () => {
    //deletar
    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            });

            //atualizando os valores do state através de um filtro
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.log(err.message)
        }
    }

    const [todos, setTodos] = useState([]);
    const getTodos = async() => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
            console.log(todos);

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
    <>
        {""}
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <td>Descrição</td>
                    <td>Inicio</td>
                    <td>Fim</td>
                    <td>Editar</td>
                    <td>Deletar</td>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>{todo.inicio}</td>
                        <td>{todo.fim}</td>
                        <td><EditTodo todo={ todo }/></td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
    )
};

export default ListTodos;