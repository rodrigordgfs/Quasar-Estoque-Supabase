<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="rows" :columns="columns" row-key="name" class="col-12">
        <template v-slot:top>
          <span class="text-h6"> Categorias </span>
          <q-space />
          <q-btn color="primary" label="Nova categoria" @click="addRow" />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="edit" color="info" dense>
              <q-tooltip> Editar categoria </q-tooltip>
            </q-btn>
            <q-btn icon="delete" color="negative" dense>
              <q-tooltip> Deletar categoria </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CategoryPage",

  setup() {
    const columns = ref([
      {
        name: "name",
        required: true,
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        sortable: true,
      },
      {
        name: "actions",
        required: true,
        label: "Ações",
        align: "right",
      },
    ]);

    const rows = ref([
      {
        name: "Bebidas",
      },
      {
        name: "Comidas",
      },
    ]);

    return {
      columns,
      rows,
    };
  },
});
</script>
