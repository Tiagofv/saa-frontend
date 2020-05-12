export function doLogin (state, payload) {
  state.user = payload
}
export function setProducts (state, payload) {
  state.products = payload
}
export function addProduct (state, payload) {
  state.products.push(payload)
}
