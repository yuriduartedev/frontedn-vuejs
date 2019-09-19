import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://api-produtos-nodejs.herokuapp.com/api'
})
