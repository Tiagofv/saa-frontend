<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Logo
        </q-toolbar-title>

        <div>Bem vindo</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Links Essenciais
        </q-item-label>

         <EssentialLink
            v-for="link in links"
            :key="link.title"
            v-bind="link"
          />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Login',
          caption: 'Entrar',
          icon: 'exit_to_app',
          link: 'login',
          when: 'unlogged'
        },
        {
          title: 'Conferir Almoxarifado',
          caption: 'Dar baixa em itens',
          icon: 'note_add',
          link: 'almox'
        },
        {
          title: 'Cadastrar novos usuários',
          caption: 'Permitir acesso a outros usuários',
          icon: 'add',
          link: 'register'
        },
        {
          title: 'Inventário',
          caption: 'Verificar itens salvos',
          icon: 'note',
          link: 'inventary'
        }
      ]
    }
  },
  computed: {
    links () {
      console.log(this.$store.getters['Main/getUser'])
      if (!this.$store.getters['Main/getUser']) {
        return this.essentialLinks.filter(e => e.when === 'unlogged')
      } else {
        return this.essentialLinks.filter(e => e.when !== 'unlogged')
      }
    }
  }
}
</script>
