<template>
<q-form class="flex flex-center" @submit="register">
    <q-card class="q-pa-md">
        <q-card-section>
            <h3>Cadastrar novo usuário</h3>
        </q-card-section>
        <q-card-section class="row">

        <div class="col-12">
            <q-input
            label="Digite o nome"
            v-model="data.email"
            >
            </q-input>
        </div>
        <div class="col-12">
            <q-input
            label="Digite o E-mail"
            v-model="data.email"
            >
            </q-input>
        </div>
        <div class="col-12">
            <q-input
            label="Senha"
            v-model="data.password"
            >
            </q-input>
        </div>
        <div class="col-12">
            <q-input
            label="Confirmação de Senha"
            v-model="data.password_confirmation"
            >
            </q-input>
        </div>
        <div class="col-12 text-center q-pt-md">
            <q-btn label="Cadastrar novo usuário" color="primary"></q-btn>
        </div>
        </q-card-section>

    </q-card>
</q-form>
</template>

<script>

export default {
  data () {
    return {
      data: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    async register () {
    //   const req = this.$axios.post('register')

    //   if (req) {
    //     this.$q.notify({
    //       message: 'Usuário adicionado com sucesso.',
    //       color: 'green'
    //     })
    //   }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
