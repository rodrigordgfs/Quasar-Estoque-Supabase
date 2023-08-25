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
            <q-btn
              icon="delete"
              color="negative"
              dense
              @click="() => handleDelete(props.row)"
            >
              <q-tooltip> Deletar categoria </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
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

    const { get, remove } = useApi();
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();
    const $q = useQuasar();

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

    const handleDelete = (category) => {
      try {
        $q.dialog({
          title: "Deletar",
          message: `Você deseja realmente deletar a categoria ${category.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          state.loading = true;
          await remove(category.id, TABLE).then(() => {
            state.loading = false;
            notifySuccess("Categoria deletada com sucesso!");
            state.rows = state.rows.filter((row) => row.id !== category.id);
          });
        });
      } catch (error) {
        state.loading = false;
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleGetCategories();
    });

    return {
      state,
      handleEdit,
      handleDelete,
    };
  },
});
</script>
