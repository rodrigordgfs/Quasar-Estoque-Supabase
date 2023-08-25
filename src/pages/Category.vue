<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="state.rows"
        :columns="state.columns"
        row-key="id"
        class="col-12"
        :loading="state.loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Categorias </span>
          <q-space />
          <q-btn
            icon="add"
            color="primary"
            label="Nova categoria"
            :to="{ name: 'CategoryForm' }"
          />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="info"
              dense
              @click="() => handleEdit(props.row)"
            >
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
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const TABLE = "category";

export default defineComponent({
  name: "CategoryPage",

  setup() {
    const state = reactive({
      loading: false,

      columns: [
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
      ],

      rows: [],
    });

    const { get } = useApi();
    const { notifyError } = useNotify();
    const router = useRouter();

    const handleGetCategories = async () => {
      try {
        state.loading = true;
        state.rows = await get(TABLE).finally(() => (state.loading = false));
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = async (category) => {
      router.push({ name: "CategoryForm", params: { id: category.id } });
    };

    onMounted(() => {
      handleGetCategories();
    });

    return {
      state,
      handleEdit,
    };
  },
});
</script>
