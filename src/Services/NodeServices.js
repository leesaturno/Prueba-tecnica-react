import axios from '../config/axiosConfig'

const listNode = (filters) => {
                return axios.get('/api/nodes', { params: { ...filters } })
}
const listLocales = () => {
                return axios.get('/api/locales')
}
const createNode = data => {
                return axios.post('/api/node', data)
}
const deleteNode = (id) => {
                return axios.delete(`/api/node/${id}`);
}

export const NodeServices = {
                listNode,
                createNode,
                deleteNode,
                listLocales
}
