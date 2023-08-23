<template>
  <q-page padding>
    <q-form @submit.prevent="handleUpdatePassword" class="row justify-center">
      <p class="text-h6 text-center col-12">Nova senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          v-model="state.form.password"
          type="password"
          label="Nova senha"
          autocomplete="new-password"
        />
        <div class="full-width q-gutter-y-md">
          <q-btn
            color="primary"
            type="submit"
            label="Atualizar senha"
            class="full-width"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import useAuth from "src/composables/UseAuth";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "UpdatePasswordPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const { resetPassword } = useAuth();
    const { notifySuccess, notifyError } = useNotify();

    const state = reactive({
      form: {
        password: "",
      },
    });

    const handleUpdatePassword = async () => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        await resetPassword(state.form.password).then(() => {
          notifySuccess("Senha atualizada com sucesso!");
          router.push({
            name: "Login",
          });
          $q.loading.hide();
        });
      } catch (error) {
        $q.loading.hide();
        notifyError(error.message);
      }
    };

    return {
      state,
      handleUpdatePassword,
    };
  },
});
</script>
