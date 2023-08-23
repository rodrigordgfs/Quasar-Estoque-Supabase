<template>
  <q-page padding>
    <q-form @submit.prevent="handleSubmit" class="row justify-center">
      <p class="text-h6 text-center col-12">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          v-model="state.form.email"
          type="email"
          label="E-mail"
          autocomplete="email"
        />
        <q-input
          v-model="state.form.password"
          type="password"
          label="Senha"
          autocomplete="current-password"
        />
        <q-btn
          color="primary"
          type="submit"
          label="Entrar"
          class="full-width"
        />
        <q-btn
          color="primary"
          label="Crie sua conta"
          class="full-width"
          flat
          :to="{ name: 'Register' }"
        />
        <q-btn
          color="primary"
          label="Esqueci minha senha"
          class="full-width"
          flat
          :to="{ name: 'ForgotPassword' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from "vue";
import useAuth from "src/composables/UseAuth";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "LoginPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { login } = useAuth();
    const { notifySuccess, notifyError } = useNotify();

    const state = reactive({
      form: {
        email: "",
        password: "",
      },
    });

    const handleSubmit = async () => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        await login(state.form).then(() => {
          $q.loading.hide();
          notifySuccess("Login efetuado com sucesso!");
          router.push({ name: "Home" });
        });
      } catch (error) {
        $q.loading.hide();
        notifyError(error.message);
      }
    };

    return {
      state,
      handleSubmit,
    };
  },
});
</script>
