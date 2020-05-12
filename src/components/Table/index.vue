<template>
    <div>
         <q-table
                :grid="$q.screen.sm"
                title="Itens"
                :data="data"
                :columns="columns"
                selection="multiple"
                :selected.sync="selection"
                row-key="code"
    >
     <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Exportar todos registros para csv"
          no-caps
          @click="exportTable"
        />
        <q-btn
          color="accent"
          icon-right="archive"
          label="Exportar seleção para csv"
          no-caps
          class="q-ma-xs"
          @click="exportTable"
        />
      </template>
         <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <!-- <q-btn dense round flat color="grey" @click="editRow(props)" icon="edit"></q-btn> -->
            <q-btn dense round flat color="grey" @click="deleteRow(props.row)" icon="delete"></q-btn>
          </q-td>
        </template>
    </q-table>
    </div>
</template>

<script>
import { exportFile } from 'quasar'
function wrapCsvValue (val, formatFn) {
  // eslint-disable-next-line no-void
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  // eslint-disable-next-line no-void
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selection: []
    }
  },
  methods: {
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.$store.getters['Main/getProducts'].map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            // eslint-disable-next-line no-void
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
         `${new Date().toLocaleDateString('pt-br')}`,
         content,
         'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    deleteRow (props) {
      this.$emit('deleteRow', props)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
