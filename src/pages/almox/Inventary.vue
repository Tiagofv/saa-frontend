<template>
    <div>
        <q-card>
            <q-card-section>
                <DataTable  :columns="columns" :data="data"/>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import DataTable from '../../components/Table'
export default {
  components: {
    DataTable
  },
  data () {
    return {
      data: [],
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
        }
      ]
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    async getProducts () {
      const req = await this.$axios.get('products/index')
      if (req) this.data = req.data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
