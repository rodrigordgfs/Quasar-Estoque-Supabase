<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar Estoque Supabase </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item
          v-for="menu in menuList"
          :key="menu.name"
          clickable
          v-ripple
          :to="{ name: menu.name }"
          exact
        >
          <q-item-section v-if="menu.meta?.icon" avatar>
            <q-icon :name="menu.meta.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ menu.meta.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuth from "src/composables/UseAuth";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { logout } = useAuth();

    const leftDrawerOpen = ref(false);

    const menuList = ref(
      router.getRoutes().filter((route) => route.meta?.menu)
    );

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const handleLogout = () => {
      $q.dialog({
        title: "Sair",
        message: "Você deseja realmente sair?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout().then(() => {
          router.replace({ name: "Login" });
        });
      });
    };

    return {
      menuList,
      handleLogout,
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
});
</script>
