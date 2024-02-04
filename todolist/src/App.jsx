import { useState } from 'react'
import './App.css'

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center'}}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo.id)}
        style={{borderRadius: '50%', border: '1px solid #ccc'}}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.title}</span>
      <div style={{ marginLeft: '8px', alignSelf:'flex-end'}}>
        <button onClick={() => deleteTodo(todo.id)} >Delete</button>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newItem = {
        title: newTodo,
        done: false,
        id: data.length
      };
      setData([...data, newItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    const updatedData = data.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setData(updatedData);
  };

  const deleteTodo = (id) => {
    const updatedData = data.filter(todo => todo.id !== id);
    setData(updatedData);
  };

  return (
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '300px', width: '100vw', alignItems: 'center', border:'thick double #32a1ce', padding:'20px'}}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task here.."
          style={{width: '180px', height:'30px', maxWidth: '280px', overflow:'hidden'}}
        />
        <button onClick={addTodo}>Add task</button>
        <div style={{paddingRight:'25px', maxWidth: '280px', overflow:'hidden'}}>
          <h2>Tasks:</h2>
          {data.map(todo => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
          ))}
        </div>
      </div>
  )
}

export default App
