// import Vue from 'vue'
// import axios from 'axios'

// axios.baseURL = 'http://teste.vixtecnologia.com.br/api/'
// Vue.prototype.$axios = axios
import axios from 'axios'

export default ({ Vue, router, store }) => {
  const vue = Vue.prototype
  vue.$axios = axios.create({
    baseURL: process.env.PROD ? 'http://localhost:8000/api/' : 'http://localhost:8000/api/',
    // baseURL: 'https://teste.vixtecnologia.com.br/api/',
    timeout: 180000
  })
  vue.$axios.interceptors.response.use((response) => {
    vue.$q.loading.hide()
    console.log(response)
    return response
  }, error => {
    console.log(error)
    vue.$q.loading.hide()
    const status = error.response.status
    const response = error.response
    console.log(response.data.errors)
    if (status === 422) { // there's an error on the data passed to the api
      const errors = Object.values(response.data.errors).flat()
      vue.$q.dialog({
        title: 'Atenção',
        message: errors.join('\n')
      })
    } else if (status === 401) {
    //   store.commit('MainStore/logout')
      router.push({ name: 'login' })
    } else if (status === 400) {
      vue.$q.dialog({
        title: 'Atenção',
        message: 'As suas credenciasrou estão incorretas.'
      })
    } else if (status === 500) {
      vue.$q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'warning',
        message: 'Não foi possível realizar esta ação. tente novamente mais tarde.'
      })
    }
  })

  vue.$axios.interceptors.request.use(request => {
    request.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    request.headers.common['Content-Type'] = 'Application/json'
    const token = localStorage.getItem('appSaa')
    if (token) request.headers.common.Authorization = token
    console.log(request)
    vue.$q.loading.show()
    return request
  }, error => {
    vue.$q.loading.hide()
    return Promise.reject(error)
  })
  // end
}
