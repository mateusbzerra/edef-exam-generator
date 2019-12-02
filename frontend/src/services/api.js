import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:8000'
});

const token = localStorage.getItem('@token');
if (token) {
  api.defaults.headers['Authorization'] = `Bearer: ${token}`;
}

export default api;
