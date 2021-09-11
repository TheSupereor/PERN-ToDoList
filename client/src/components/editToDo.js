import React, { useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const [inicio, setInicio] = useState(todo.inicio);
    const [fim, setFim] = useState(todo.fim);

    console.log(todo);

    //edit description function
    const updateToDo = async e => {
        e.preventDefault();

        try {
            const body = { description, inicio, fim };
            const response = await fetch(`https://localhost:5000/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })

            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    }

    return(
    <>
        <button 
        type="button" 
        className="btn btn-warning" 
        data-bs-toggle="modal" 
        data-bs-target={`#id${todo.todo_id}`}>
            Editar
        </button>

        <div 
        className="modal fade" 
        id={`id${todo.todo_id}`} 
        onClick={() => {
            setDescription(todo.description);
            setInicio(todo.inicio);
            setFim(todo.fim)}}>
            <div className="modal-dialog">
                <div className="modal-content w-700">
                    <div className="modal-header">
                        <h4 className="modal-title">Editar To Do</h4>
                        <button type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setDescription(todo.description);
                            setInicio(todo.inicio);
                            setFim(todo.fim)
                        }}>
                        </button>
                    </div>

                    <div className="row modal-body">
                        <div className="col-sm-12">
                            <label className="mb-1">Tarefa:</label>        
                            <input type="text" 
                            className="form-control mb-2" 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="col">
                            <label className="mb-1">Início:</label>        
                            <input type="time" 
                            className="form-control mb-2" 
                            value={inicio}
                            onChange={e => setInicio(e.target.value)}
                            />
                        </div>

                        <div className="col">
                            <label className="mb-1">Fim:</label>
                            <input type="time" 
                            className="form-control" 
                            value={fim}
                            onChange={e => setFim(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" 
                        className="btn btn-warning" 
                        data-bs-dismiss="modal"
                        onClick={e => updateToDo(e)}
                        >
                            Editar
                        </button>

                        <button type="button" 
                        className="btn btn-danger" 
                        data-bs-dismiss="modal"
                        onClick={() => {
                            setDescription(todo.description);
                            setInicio(todo.inicio);
                            setFim(todo.fim)
                        }}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default EditTodo;
