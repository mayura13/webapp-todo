import React, {useState} from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (evt) => setInputValue(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(inputValue.trim() == "") return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      complete: false
    }
    setTodos([...todos, newTodo]);
    setInputValue("");
  }

  const deleteItem = id =>{
    const filtered = todos.filter(todo=> todo.id != id);
    setTodos(filtered);
  }

  const toggleTodo = (id) => {
    const updated = todos.map(
      todo => todo.id === id?{...todo, complete: !todo.complete} :todo
    );
    setTodos(updated);
  }; 

  return(
      <div className="App">
      <h1>Todo App</h1>
     <form className="inputArea" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">추가</button>
     </form>
      <input value={inputValue} onChange={handleInputChange} />
      <button onClick={handleSubmit}>확인</button>
      <ul>
        {todos.map(todo=> (
          <li key = {todo.id}>
            <input type = "checkbox" checked= {todo.complete}
              onChange={()=> toggleTodo(todo.id)} />
            <span style= {{textDecoration: todo.complete? 'line-through':'none'}}>
              {todo.text}
            </span>
            <button onClick = {()=>deleteItem(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
    );
  }
export default App;
