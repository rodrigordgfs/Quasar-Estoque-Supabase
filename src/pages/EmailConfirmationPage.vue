<template>
  <q-page class="padding">
    <p class="text-body1 text-center">Obrigado por se registrar</p>
    <p class="text-center">
      Por favor! Confirme seu e-mail para finalizar seu registro:
      <span class="text-bold">{{ $route.query.email }}</span>
    </p>
    <q-btn
      color="primary"
      label="Voltar para o login"
      class="full-width"
      flat
      :to="{ name: 'Login' }"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmationPage",
});
</script>
