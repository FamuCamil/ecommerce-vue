<template>
  <BasicLayout>
    <div class="login">
      <h2>Iniciar sesión</h2>
      <form class="ui form" @submit.prevent="login">
        <div class="field">
          <input
            v-model="formData.identifier"
            type="text"
            placeholder="Nombre de usuario"
            :class="{ error: formError.identifier }"
          />
        </div>
        <div class="field">
          <input
            v-model="formData.password"
            type="password"
            placeholder="password"
            :class="{ error: formError.password }"
          />
        </div>
        <button
          class="ui button fluid primary"
          type="submit"
          :class="{ loading }"
        >
          Entrar
        </button>
      </form>
      <router-link to="/register"> Crear una cuenta </router-link>
    </div>
  </BasicLayout>
</template>

<script>
import { onMounted, ref } from "vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import * as Yup from "yup";
import { loginApi } from "@/api/user";
import { useRouter } from "vue-router";
import { setTokenApi, getTokenApi } from "@/api/token";

export default {
  name: "Login",
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    let loading = ref(false);
    const router = useRouter();
    const token = getTokenApi();

    onMounted(() => {
      if (token) return router.push("/");
    });

    const schemaForm = Yup.object().shape({
      identifier: Yup.string().required(true),
      password: Yup.string().required(true),
    });

    const login = async () => {
      formError.value = {};
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });

        try {
          const response = await loginApi(formData.value);
          if (!response?.jwt) throw "El usuario o contraseña no son válidos";
          setTokenApi(response.jwt);
          router.push("/");
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
    };
    return { formData, formError, loading, login };
  },
};
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
  > h2 {
    margin: 50px 0 30px 0;
  }

  .ui.form {
    max-width: 300px !important;
    margin: 0 auto;
    margin-bottom: 10px;

    input.error {
      border-color: #faa;
      background-color: #ffeded;
    }
  }
}
</style>
