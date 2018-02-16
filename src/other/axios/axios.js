import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;

// post传参序列化(请求拦截器)
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回状态判断(响应拦截器)
axios.interceptors.response.use((res) =>{
  if(res.data.msg === 'error'){
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
