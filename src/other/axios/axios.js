import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = false;
let isSerialize = false; // 解决express服务器post无法接收参数bug

// post传参序列化(请求拦截器)
axios.interceptors.request.use((config) => {
  if (isSerialize && config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回状态判断(响应拦截器)
axios.interceptors.response.use((resp) =>{
  if(resp.data.status === 0){
    return Promise.reject(resp.data.result);
  }
  return resp.data.result;
}, (error) => {
  return Promise.reject(error);
});

export default axios;
