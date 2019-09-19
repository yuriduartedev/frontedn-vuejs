import { http } from './config'

export default {

  listar:() => {
    return http.get('produtos')
  },

  salvar:(produto) => {
    return http.post('produto', { nome: produto.nome, quantidade: produto.quantidade, valor: produto.valor})
  },

  atualizar:(produto, id) => {
    return http.put(`produto/${id}`, { nome: produto.nome, quantidade: produto.quantidade, valor: produto.valor})
  },

  apagar:(produto, id) => {
    return http.delete(`produto/${id}`, { data: produto })
  }

}
