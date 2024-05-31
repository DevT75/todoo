import axios from 'axios';
import Router from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : "http://localhost:3000/api";

const refreshToken = async () => {
  try {
    const refresh_token = sessionStorage.getItem('refresh_token');
    const response = await axios.post(`${API_URL}/auth/refresh}`, {
      refresh_token
    });
    const { access_token, refresh_token: new_refresh_token } = response.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', new_refresh_token);
    return access_token;
  } catch (error) {
    console.error('Refresh token error:', error);
    Router.push('/login');
    throw error;
  }
};

axios.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/create`, {
      email: email,
      username: username,
      password: password
    });
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration error:', error.response.data);
  }
};

export const login = async (username, password) => {
  try {
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('password', password);
    const response = await axios.post(`${API_URL}/auth/login`, data);
    const { access_token, refresh_token } = response.data;
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
    return response.data;
  }
  catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const fetchTodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/todo/`);
    return response.data;
  } catch (error) {
    if(error.response.data.detail == "Could not validate credentials"){
      Router.push('/login');
    }
    console.error('Error fetching todos:', error);
  }
};

export const createTodo = async ({ title, description, priority, due_date }) => {
  try {
    const response = await axios.post(`${API_URL}/todo/create`, {
      title: title,
      description: description,
      status: false,
      priority: priority,
      due_date: due_date
    });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, todoData) => {
  const token = sessionStorage.getItem('access_token');
  const response = await axios.put(`${API_URL}/todo/${id}`, todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const token = sessionStorage.getItem('access_token');
  const response = await axios.delete(`${API_URL}/todo/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
