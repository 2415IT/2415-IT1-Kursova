import { useState } from 'react';
import { Card, CardContent, Button, Input, Label } from '@/components/ui/card';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Label>Username</Label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
