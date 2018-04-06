import axios from 'axios'
import Cookies from 'js-cookie';
let http = axios.create({
  timeout: 5000
})
// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  config.headers['Content-Type'] = 'application/json'
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // console.log(JSON.stringify(error))
  if (error && error.response) {
    if (error.response.status === 401) {
      Message.error({
        content: ' 401 not auth',
        duration: 10
      })
    }
    if (error.response.status === 404) {
      Message.error({
        content: ' 404 not found',
        duration: 10
      })
    }

    if (error.response.status === 500) {
      Message.error({
        content: ' 500 system error ',
        duration: 10
      })
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

export default http