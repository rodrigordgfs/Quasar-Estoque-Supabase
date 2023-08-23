<template>
  <q-page padding>
    <q-form @submit.prevent="handlePasswordReset" class="row justify-center">
      <p class="text-h6 text-center col-12">Esqueci minha senha</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          v-model="state.form.email"
          type="email"
          label="E-mail"
          autocomplete="email"
        />
        <div class="full-width q-gutter-y-md">
          <q-btn
            color="primary"
            type="submit"
            label="Recuperar senha"
            class="full-width"
          />
          <q-btn
            flat
            color="primary"
            label="Voltar"
            class="full-width"
            :to="{ name: 'Login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import useAuth from "src/composables/UseAuth";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ForgotPasswordPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { sendResetPassword } = useAuth();

    const state = reactive({
      form: {
        email: "",
      },
    });

    const handlePasswordReset = async () => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        await sendResetPassword(state.form.email).then(() => {
          $q.notify({
            message: "E-mail enviado com sucesso! Verifique seu e-mail!",
            icon: "check",
            color: "positive",
            position: "bottom",
            timeout: 3000,
          });
          router.push({
            name: "Login",
          });
          $q.loading.hide();
        });
      } catch (error) {
        $q.loading.hide();
        $q.notify({
          message: error.message,
          icon: "warning",
          color: "negative",
          position: "bottom",
          timeout: 3000,
        });
      }
    };

    return {
      state,
      handlePasswordReset,
    };
  },
});
</script>
