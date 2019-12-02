import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:8000'
});

const token = localStorage.getItem('@token');
if (token) {
  api.defaults.headers['Authorization'] = `Bearer: ${token}`;
}
api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? 'put' : 'post';
  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
};
export default api;
