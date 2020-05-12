<template>
    <div class="q-pa-md">
        <q-card class="q-pa-md">
                <q-form class="" @submit="insertData">
            <div class="">
                <h4>Formulário de Conferência</h4>
            </div>
            <q-card-section class="row justify-between q-col-gutter-md full-width">
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <q-input label="Código" v-model="data.code" :rules="[required]"></q-input>
                    </div>
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <q-input label="Descrição" v-model="data.description" :rules="[required]"></q-input>
                    </div>
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <q-input label="Quantidade" v-model="data.quantity" type="number" :rules="[required]"></q-input>

                    </div>
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                                <q-select
                          v-model="data.measure_unit"
                          :options="optionsMeasure"
                          label="Selecione uma Unidade de Medida"
                          :rules="[required]"
                        >
                        </q-select>
                    </div>
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <q-input label="Posição Inicial" v-model="data.initial" mask="XXX-XX-XX" :rules="[required]"></q-input>

                    </div>
                    <div class="col-6 col-xs-12 col-sm-12 col-md-6 col-lg-6">
                        <q-input label="Destino" v-model="data.destiny"  mask="XXX-XX-XX" :rules="[required]"></q-input>

                    </div>
            </q-card-section>
            <q-card-actions align="center">
                <q-btn label="Inserir" color="primary" type="submit"></q-btn>
                <q-btn label="Ler QRCODE" color="accent" @click="readQrcode = true" :disable="true"></q-btn>
                <qrcode-stream v-if="readQrcode" @decode="onDecode"></qrcode-stream>

            </q-card-actions>
              <DataTable :data="$store.getters['Main/getProducts']" :columns="columns" @deleteRow="eraseRow"/>
                </q-form>
       <div class="q-mt-md text-center">
          <q-btn color="secondary" label="Limpar" @click="$store.commit('Main/setProducts', [])" class="q-mr-md" ></q-btn>
          <q-btn color="primary" label="Salvar no Servidor e Limpar" @click="save"></q-btn>

       </div>
        </q-card>

    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { required } from '../../validations'
import DataTable from '../../components/Table'
export default {
  components: {
    QrcodeStream,
    DataTable
  },
  data () {
    return {
      optionsMeasure: ['M²', 'Unidade', 'KG', 'Ton', 'CJ', 'PAR', 'L', 'TAM', 'M'],
      options: null,
      selection: [],
      table: [],
      columns: [
        {
          label: 'Código',
          field: 'code'
        },
        {
          label: 'Descrição',
          field: 'description'
        },
        {
          label: 'Quantidade',
          field: 'quantity'
        },
        {
          label: 'Un. medida',
          field: 'measure_unit'
        },
        {
          label: 'Posição Inicial',
          field: 'initial'
        },
        {
          label: 'Destino',
          field: 'destiny'
        },
        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      data: {
        code: '',
        description: '',
        quantity: '',
        measure_unit: '',
        initial: '',
        destiny: ''
      },
      readQrcode: false
    }
  },
  methods: {
    required,
    async eraseRow (props) {
      const data = this.$store.getters['Main/getProducts'].slice()
      if (data.length > 0) {
        data.splice(props.index, 1)
        this.$store.commit('Main/setProducts', data)
      }
    },
    async save () {
      if (this.$store.getters['Main/getProducts'].length < 1) {
        this.$q.notify({
          message: 'Por favor, insira um produto.',
          color: 'negative',
          icon: 'warning'
        })
        return false
      }
      const req = await this.$axios.post('products/store', { data: this.$store.getters['Main/getProducts'] })
      if (req) {
        await this.$store.commit('Main/setProducts', [])
      }
    },
    async insertData () {
      const data = {
        ...this.data,
        index: await this.$store.getters['Main/getProducts'].length !== 0 ? this.$store.getters['Main/getProducts'].length - 1 : 0
      }

      this.$store.commit('Main/addProduct', data)
      // this.data.code = ''
      // this.data.description = ''
      // this.data.quantity = ''
      // this.data.measure_unit = ''
      // this.data.initial = ''
      // this.data.destiny = ''
    },

    onDecode () {
      alert('Qr code lido com sucesso!.')
    },
    generateData (qty) {
      for (let i = 0; i < qty; i++) {
        this.table.push({
          code: Math.floor(Math.random() * 100),
          description: 'Descrição...',
          quantity: Math.floor(Math.random() * 10),
          measure: 'Un',
          initial: 'DEP A',
          destiny: 'DEP B'
        })
      }
    }
  },
  created () {
    // this.generateData(10)
  }
}
</script>

<style lang="scss" scoped>

</style>
