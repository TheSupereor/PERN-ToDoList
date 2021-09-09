import React, { useState } from "react";

const InputToDo = () => {
    const [description, setDescription] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description, inicio, fim};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
    <>
        <h1 className="text-center mt-5">PERN To Do List</h1>
        <form className="row mt-5" onSubmit={onSubmitForm}>
          <div className="col-sm-7">
            <label className="mb-1">Tarefa:</label>
            <input type="text" 
            className="form-control" 
            value={description}
            onChange={e => setDescription(e.target.value)}
            aria-describedby="infoInput"
            />
            <div id="infoInput" className="form-text">
                Qual tarefa vai fazer? Lembre de detalhar para lembrar o que é quando for fazer!
            </div>
          </div>

          <div className="col-sm">
            <label className="mb-1">Início:</label>
            <input type="time" 
            className="form-control" 
            value={inicio}
            onChange={e => setInicio(e.target.value)}
            />
          </div>

          <div className="col-sm">
            <label className="mb-1">Fim:</label>
            <input type="time" 
            className="form-control" 
            value={fim}
            onChange={e => setFim(e.target.value)}
            />
          </div>

          <div className="col">
            <button className="btn btn-success mt-3 px-5 py-3">Add</button>
          </div>

        </form>
    </>
    );
};

export default InputToDo;