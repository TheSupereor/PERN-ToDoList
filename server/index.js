const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
//dando acessado para pegar data json do body
app.use(express.json());

//------------------------ Rotas -------------------------
//criar um todo
app.post("/todos", async (req,res) => {
    try {
        //pegar a descrição enviada do usuário
        const { description, inicio, fim } = req.body;
        //inserir no banco de dados com o pg
        const newTodo = await pool.query(
            //returning * faz com que o que foi inserido volte na resposta
            "INSERT INTO todo (description, inicio, fim) VALUES ($1, $2, $3) RETURNING *", [description, inicio, fim]
        );
        //receber como resposta em json
        res.json(newTodo.rows[0]);

    } catch (err) {
        console.log(err.message)
    }
})

//pegar todos os todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//pegar um todo
app.get("/todos/:id", async (req,res)=> {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message)
    }
})

//atualizar um todo
app.put("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { description, inicio, fim } = req.body;

        const updateTodo = await pool.query("UPDATE todo SET description = $1, inicio = $2, fim = $3 WHERE todo_id = $4", [description, inicio, fim, id])
        res.json("Todo foi atualizado")
    
    } catch (err) {
        console.log(err.message)
    }
})

//deletar um todo
app.delete("/todos/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo foi deletado com sucesso")
    } catch (err) {
        console.log(err.message);
    }
})

let port = 5000;
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
});