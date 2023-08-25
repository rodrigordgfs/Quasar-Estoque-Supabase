<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center">
        <p class="text-h6">Categoria</p>
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
          :to="{ name: 'Category' }"
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

const TABLE = "category";

export default defineComponent({
  name: "CategoryFormPage",

  setup() {
    const state = reactive({
      loading: false,
      form: {
        name: "",
      },
      id: null,
    });

    const { create, getById, update } = useApi();
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const { notifyError, notifySuccess } = useNotify();

    const isUpdate = computed(() => !!route.params.id);

    onMounted(() => {
      if (isUpdate.value) {
        state.id = route.params.id;
        handleGetCategory(route.params.id);
      }
    });

    const handleSubmit = async () => {
      try {
        state.loading = true;
        if (isUpdate.value) {
          await update(state.id, TABLE, state.form)
            .then(() => {
              notifySuccess("Categoria atualizada com sucesso!");
              router.push({ name: "Category" });
            })
            .finally(() => {
              state.loading = false;
            });
        } else {
          await create(TABLE, state.form)
            .then(() => {
              notifySuccess("Categoria criada com sucesso!");
              router.push({ name: "Category" });
            })
            .finally(() => {
              state.loading = false;
            });
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetCategory = async (id) => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        const data = await getById(id, TABLE).finally(() => {
          $q.loading.hide();
        });
        state.form.name = data.name;
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
