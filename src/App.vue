<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          Campo <b>{{ erro.param }}</b> - {{ erro.msg }}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <label>Nome</label>
        <input type="text" placeholder="Nome" v-model="produto.nome">
        <label>Quantidade</label>
        <input type="number" placeholder="QTD" v-model="produto.quantidade">
        <label>Valor</label>
        <input type="text" placeholder="Valor" v-model="produto.valor">
        <button class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>ID</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.valor }}</td>
            <td>{{ produto._id }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">edit</i>
              </button>
              <button @click="remover(produto)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Produto from './services/produtos'

export default {
  data() {
    return {
      produto: {
        _id: '',
        nome: '',
        quantidade: '',
        valor: ''
      },
      produtos: [],
      errors: []
    }
  },

  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Produto.listar().then(res => {
      this.produtos = res.data
      });
    },

    salvar() {

      if(!this.produto._id){
        console.log('Passou no salvar');

        Produto.salvar(this.produto).then(res => {
          this.produto = {}
          // alert('Salvo com sucesso!');
          this.listar();
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data
        });
      } else {
        console.log('Passou no salvar');
        Produto.atualizar(this.produto, this.produto._id).then(res => {
          this.produto = {}
          // alert('Atualizado com sucesso!');
          this.listar();
          this.errors = []
        }).catch(e => {
          this.errors = e.response.data
        });
      }

    },

    editar(produto) {
      this.produto = produto
    },

    remover(produto) {
      this.produto = produto

      if(confirm('Deseja excluir o produto?')){
        Produto.apagar(this.produto, this.produto._id).then(res => {
          this.listar();
          this.errors = []
          this.produto = {}
        }).catch(e => {
          this.errors = e.response.data
        });
      }

    }
  },
}
</script>

<style>
</style>
