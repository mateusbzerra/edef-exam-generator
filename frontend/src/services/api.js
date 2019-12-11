import Axios from 'axios';

const api = Axios.create({
  baseURL: 'http://localhost:8000'
});

api.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('@token');
    config.headers = {
      Authorization: token ? `Bearer ${token}` : null
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? 'put' : 'post';
  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
};
export default api;
