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
          <span class="text-h6"> Produtos </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            icon="add"
            color="primary"
            label="Novo Produto"
            :to="{ name: 'ProductForm' }"
          />
        </template>

        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar>
              <img :src="props.row.img_url" />
            </q-avatar>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="info"
              dense
              @click="() => handleEdit(props.row)"
            >
              <q-tooltip> Editar produco </q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              dense
              @click="() => handleDelete(props.row)"
            >
              <q-tooltip> Deletar produto </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky
      v-if="$q.platform.is.mobile"
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn fab icon="add" color="primary" :to="{ name: 'ProductForm' }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const TABLE = "product";

export default defineComponent({
  name: "ProductPage",

  setup() {
    const state = reactive({
      loading: false,

      columns: [
        {
          name: "img_url",
          label: "Imagem",
          align: "left",
          field: (row) => row.imag_ul,
        },
        {
          name: "name",
          label: "Nome",
          align: "left",
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: "amount",
          label: "Quantidade",
          align: "left",
          field: (row) => row.amount,
          sortable: true,
        },
        {
          name: "pice",
          label: "Preço",
          align: "left",
          field: (row) => row.price,
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

    const handleGetProducts = async () => {
      try {
        state.loading = true;
        state.rows = await get(TABLE).finally(() => (state.loading = false));
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = async (product) => {
      router.push({ name: "ProductForm", params: { id: product.id } });
    };

    const handleDelete = (product) => {
      try {
        $q.dialog({
          title: "Deletar",
          message: `Você deseja realmente deletar o produto ${product.name}?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          state.loading = true;
          await remove(product.id, TABLE).then(() => {
            state.loading = false;
            notifySuccess("Produto deletado com sucesso!");
            state.rows = state.rows.filter((row) => row.id !== product.id);
          });
        });
      } catch (error) {
        state.loading = false;
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleGetProducts();
    });

    return {
      state,
      handleEdit,
      handleDelete,
    };
  },
});
</script>
