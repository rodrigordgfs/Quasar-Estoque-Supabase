import { useQuasar } from "quasar";
export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      message: message,
      icon: "check",
      color: "positive",
      position: "bottom",
      timeout: 3000,
    });
  };

  const notifyError = (message) => {
    $q.notify({
      message: message,
      icon: "error",
      color: "negative",
      position: "bottom",
      timeout: 3000,
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
}
