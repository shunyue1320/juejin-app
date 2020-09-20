export default function ({ app: { $axios, $cookies } }) {
  $axios.defaults.baseURL = process.env.baseUrl
  $axios.defaults.timeout = 3000
  $axios.interceptors.request.use(config => {  //设置请求头
    config.headers['X-Token'] = $cookies.get('token') || ''
		config.headers['X-Device-Id'] = $cookies.get('clientId') || ''
    config.headers['X-Uid'] = $cookies.get('userId') || ''
    return config
  })
  $axios.interceptors.response.use(response => {
    if (/^[4/5]/.test(response.status)) { //如果返回是400 ~ 500
      return Promise.reject(response.statusText)
    }
    return response.data                  //否则直接返回数据
  })
}