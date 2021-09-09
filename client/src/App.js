//import logo from './logo.svg';
import './App.css';
import InputToDo from './components/InputToDo';
import ListTodos from './components/listToDos';

function App() {
  return (
    <>
      <div className="container">
        <InputToDo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
