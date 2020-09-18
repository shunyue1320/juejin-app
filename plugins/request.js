export default ({app: { $axios } }, inject) => {
  let requestList = {}
  const methods = [ 'get', 'post', 'put', 'delete' ]
  methods.forEach(method => {
    let datakey = method === 'get' ? 'params' : 'data'
    requestList[method] = function (url, data) {
      return $axios({ method, url, [datakey]: data }).catch(err => {
        console.error(err);
        return { err_no: 1, data: {}, errors: [err] }
      })
    }
  })
  inject('request', requestList)
}