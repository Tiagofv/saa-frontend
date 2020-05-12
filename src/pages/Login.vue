<template>
  <q-page class="flex flex-center">
     <q-card class="my-card full-width">
       <q-card-title class="text-center">
        <h3>LOGO</h3>
       </q-card-title>
      <q-card-section>
        <q-form @submit="login">
              <q-input v-model="user.email" label="E-mail" >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
              <q-input v-model="user.password" label="Senha"  type="password">
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
        </q-input>
        <q-card-actions align="center" class="q-mt-md">
          <div class="">
            <q-btn label="Entrar" color="primary"
             type="submit"></q-btn>
          </div>
        </q-card-actions>

        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const req = await this.$axios.post('login', this.user)
      if (req) {
        localStorage.setItem('appSaa', 'Bearer ' + req.data.access_token)
        await this.$store.commit('Main/doLogin', req.data.user)
        this.$router.push({ name: 'almox' })
      }
    }
  }
}
</script>

<style lang="scss">
.my-card{
  min-width: 300px;
  max-width: 40%;
}
</style>
