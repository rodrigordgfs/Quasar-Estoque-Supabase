<template>
  <q-dialog
    :model-value="isOpened"
    :full-width="$q.platform.is.mobile"
    @before-hide="handleClose"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">Detalhes</div>
      </q-card-section>

      <q-card-section>
        <q-img :src="product.img_url" :ratio="4 / 3" style="min-width: 300px" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <span class="text-body2" v-html="product.description" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          label="Fazer Pedido"
          color="primary"
          icon="assignment"
          @click="handleSendWhatsapp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { formatCurrency } from "src/utils/format";
import { defineComponent, reactive } from "vue";
import { useQuasar, openURL } from "quasar";

export default defineComponent({
  name: "DialogProductDetails",

  props: {
    isOpened: {
      type: Boolean,
      required: false,
    },
    product: {
      type: Object,
      required: true,
    },
  },

  setup(props, { emit }) {
    console.log("props", props);
    const state = reactive({});
    const $q = useQuasar();

    const handleClose = () => {
      emit("update:isOpened", false);
    };

    const handleSendWhatsapp = () => {
      const phone = "5551996236798";
      const message = `Olá, gostaria de fazer o pedido do produto ${props.product.name}`;
      const url = encodeURI(
        `https://api.whatsapp.com/send?phone=${phone}&text=${message}`
      );
      openURL(url);
    };

    return {
      state,
      formatCurrency,
      handleClose,
      handleSendWhatsapp,
    };
  },
});
</script>
