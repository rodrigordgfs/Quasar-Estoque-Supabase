<template>
  <q-page padding>
    <q-form @submit.prevent="handleRegister" class="row justify-center">
      <p class="text-h6 text-center col-12">Crie sua conta</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          v-model="state.form.name"
          type="text"
          label="Nome"
          autocomplete="name"
          lazy-rules
          :rules="[(val) => !!val || 'Por favor! Preencha o campo nome']"
        />
        <q-input
          v-model="state.form.email"
          type="email"
          label="E-mail"
          autocomplete="email"
          lazy-rules
          :rules="[(val) => !!val || 'Por favor! Preencha o campo e-mail']"
        />
        <q-input
          v-model="state.form.password"
          type="password"
          label="Senha"
          autocomplete="current-password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'O campo senha precisa ter 6 ou mais caracteres',
          ]"
        />
        <div class="full-width q-gutter-y-md">
          <q-btn
            color="primary"
            type="submit"
            label="Criar sua conta"
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
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { register } = useAuth();
    const { notifySuccess, notifyError } = useNotify();

    const state = reactive({
      form: {
        name: "",
        email: "",
        password: "",
      },
    });

    const handleRegister = async () => {
      try {
        $q.loading.show({
          message: "Por favor! Aguarde!",
        });
        await register(state.form).then(() => {
          notifySuccess("Cadastro efetuado com sucesso! Confirme seu email!");
          router.push({
            name: "EmailConfirmation",
            query: { email: state.form.email },
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
      handleRegister,
    };
  },
});
</script>
