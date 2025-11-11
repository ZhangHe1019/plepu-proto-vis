import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      let url = '';
      let body = {};

      if (mode === 'login') {
        url = 'http://127.0.0.1:5000/login';
        body = { email: values.email, password: values.password };
      } else if (mode === 'register') {
        url = 'http://127.0.0.1:5000/register';
        body = { email: values.email };
      } else if (mode === 'forgot') {
        url = 'http://127.0.0.1:5000/forgot-password';
        body = { email: values.email };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        message.success(data.message || 'Success!');
        if (mode === 'login') onLogin(data.token);
      } else {
        message.error(data.error || 'Error!');
      }
    } catch (err) {
      message.error('Server error');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#fff' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {mode === 'login' && 'Login'}
        {mode === 'register' && 'Register'}
        {mode === 'forgot' && 'Forgot Password'}
      </Title>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email format!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {(mode === 'login') && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register'}
            {mode === 'forgot' && 'Send Reset Email'}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: 10 }}>
        {mode === 'login' && (
          <>
            <Button type="link" onClick={() => setMode('register')}>Register</Button>
            <Button type="link" onClick={() => setMode('forgot')}>Forgot Password?</Button>
          </>
        )}
        {mode === 'register' && (
          <Button type="link" onClick={() => setMode('login')}>Back to Login</Button>
        )}
        {mode === 'forgot' && (
          <Button type="link" onClick={() => setMode('login')}>Back to Login</Button>
        )}
      </div>
    </div>
  );
};

export default Login;
