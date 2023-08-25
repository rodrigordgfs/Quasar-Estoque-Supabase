<template>
  <q-page padding>
    <div class="row">
      <q-table
        grid
        :rows="state.rows"
        :columns="state.columns"
        row-key="id"
        class="col-12"
        :loading="state.loading"
        :filter="state.filter"
      >
        <template v-slot:top>
          <span class="text-h6"> Produtos </span>
          <q-space />
          <q-input
            outlined
            dense
            debounce="500"
            v-model="state.filter"
            type="text"
            placeholder="Procurar"
            class="q-mr-sm"
          >
            <template v-slot:append> <q-icon name="search" /> </template
          ></q-input>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-img
                :src="props.row.img_url"
                :ratio="4 / 3"
                spinner-color="primary"
                spinner-size="82px"
              />
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">
                  {{ formatCurrency(props.row.price) }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { defineComponent, onMounted, reactive } from "vue";
import { formatCurrency } from "src/utils/format";
import { useRoute } from "vue-router";

const TABLE = "product";

export default defineComponent({
  name: "ProductPublicPage",

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
          field: (row) => formatCurrency(row.price),
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

      filter: "",
    });

    const { getPublic } = useApi();
    const { notifyError } = useNotify();
    const route = useRoute();

    const handleGetProducts = async (idUser) => {
      try {
        state.loading = true;
        state.rows = await getPublic(idUser, TABLE).finally(
          () => (state.loading = false)
        );
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      if (route.params.id) {
        handleGetProducts(route.params.id);
      }
    });

    return {
      state,
      formatCurrency,
    };
  },
});
</script>
