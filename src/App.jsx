import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    // ローカルストレージから初期値を取得
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  // todosが変わったらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // TODO追加
  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  // チェック切り替え
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  // TODO削除
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  // TODO編集
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div style={{ margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>TODOリスト</h1>

      <div>
        <input 
          type="Todotext"
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="新しいTODOを入力" 
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo.id)} 
            />
            <span style={{ 
              marginLeft: 8, 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button style={{ marginLeft: 10 }} onClick={() => deleteTodo(todo.id)}>削除</button>

            <button style={{ marginLeft: 10 }} onClick={() => editTodo(todo.id, prompt('新しいTODOを入力', todo.text))}>編集</button>
          </li>
        ))}
      </ul>

      <footer style={{ borderTop: '1px solid #ccc', marginTop: 30, paddingTop: 10, textAlign: 'center', color: '#12f1a6ff' }}>
        &copy; Nathome
      </footer>
    </div>
  );
}

export default App;
