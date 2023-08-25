<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Produto</p>
      </div>
      <q-form
        @submit.prevent="handleSubmit"
        class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
      >
        <q-input
          label="Nome"
          v-model="state.form.name"
          :rules="[(val) => !!val || 'Por favor! Preencha o campo nome']"
        />
        <q-editor v-model="state.form.description" min-height="5rem" />
        <q-input
          label="Quantidade"
          v-model="state.form.amount"
          type="number"
          :rules="[(val) => !!val || 'Por favor! Preencha o campo quantidade']"
        />
        <q-input
          label="Preço"
          v-model="state.form.price"
          type="number"
          prefix="R$"
          :rules="[(val) => !!val || 'Por favor! Preencha o campo preço']"
        />
        <q-select
          v-model="state.form.category_id"
          :options="state.optionsCategory"
          label="Categoria"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[(val) => !!val || 'Por favor! Preencha o campo categoria']"
        />
        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
          type="submit"
          color="primary"
          class="full-width"
          :disable="state.loading"
        />
        <q-btn
          label="Voltar"
          type="submit"
          color="primary"
          class="full-width"
          :to="{ name: 'Product' }"
          flat
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

const TABLE = "product";

export default defineComponent({
  name: "ProductFormPage",

  setup() {
    const state = reactive({
      loading: false,
      form: {
        name: "",
        description: "",
        amount: 0,
        price: 0,
        category_id: null,
      },
      id: null,
      optionsCategory: [],
    });

    const { create, get, getById, update } = useApi();
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const { notifyError, notifySuccess } = useNotify();

    const isUpdate = computed(() => !!route.params.id);

    onMounted(() => {
      handleGetCategories();
      if (isUpdate.value) {
        state.id = route.params.id;
        handleGetProduct(route.params.id);
      }
    });

    const handleGetCategories = async () => {
      try {
        const data = await get("category");
        state.optionsCategory = data.map((category) => {
          return {
            id: category.id,
            name: category.name,
          };
        });
        console.log(state.optionsCategory);
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleSubmit = async () => {
      try {
        state.loading = true;
        if (isUpdate.value) {
          await update(state.id, TABLE, state.form)
            .then(() => {
              notifySuccess("Produto atualizado com sucesso!");
              router.push({ name: "Product" });
            })
            .finally(() => {
              state.loading = false;
            });
        } else {
          await create(TABLE, state.form)
            .then(() => {
              notifySuccess("Produto criado com sucesso!");
              router.push({ name: "Product" });
            })
            .finally(() => {
              state.loading = false;
            });
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetProduct = async (id) => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        const data = await getById(id, TABLE).finally(() => {
          $q.loading.hide();
        });
        state.form = {
          name: data.name,
          description: data.description,
          amount: data.amount,
          price: data.price,
          category_id: data.category_id,
        };
      } catch (error) {
        $q.loading.hide();
        notifyError(error.message);
      }
    };

    return {
      state,
      isUpdate,
      handleSubmit,
    };
  },
});
</script>
