import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Button } from '@/components/ui/card';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const API_URL = 'http://localhost:5000/users';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch users from API on load
  useEffect(() => {
    axios.get(API_URL).then(response => setUsers(response.data));
  }, []);

  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) setIsAuthenticated(true);
    else alert('Invalid credentials');
  };

  const handleRegister = async (username, password) => {
    if (users.some(u => u.username === username)) {
      alert('User already exists');
    } else {
      try {
        const newUser = { username, password };
        await axios.post(API_URL, newUser);
        setUsers([...users, newUser]);
        alert('Registration successful');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="bg-white shadow p-4 rounded-2xl flex justify-between">
          <span className="text-xl font-bold">React Coursework</span>
          {isAuthenticated ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={() => window.location.href='/login'}>Login</Button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <Card><CardContent>Welcome to the React Coursework App!</CardContent></Card>;
}

export default App;
