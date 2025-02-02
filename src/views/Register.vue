<template>
  <BasicLayout>
    <div class="register">
      <h2>Registro de usuarios</h2>
      <form action="" class="ui form" @submit.prevent="register">
        <div class="field">
          <input
            v-model="formData.username"
            type="text"
            placeholder="Nombre de usuario"
            :class="{ error: formError.username }"
          />
        </div>
        <div class="field">
          <input
            v-model="formData.email"
            type="text"
            placeholder="Correo electrónico"
            :class="{ error: formError.email }"
          />
        </div>
        <div class="field">
          <input
            v-model="formData.password"
            type="password"
            placeholder="Contraseña"
            :class="{ error: formError.password }"
          />
        </div>

        <button
          type="submit"
          class="ui button fluid primary"
          :class="{ loading }"
        >
          Crear usuario
        </button>
      </form>
      <router-link to="/login">Iniciar sesión</router-link>
    </div>
  </BasicLayout>
</template>

<script>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted, ref } from "vue";
import * as Yup from "yup";
import { registerApi } from "@/api/user";
import { useRouter } from "vue-router";
import { getTokenApi } from "@/api/token";

export default {
  name: "Register",
  components: {
    BasicLayout,
  },
  setup() {
    let formData = ref({});
    let formError = ref({});
    const router = useRouter();
    let loading = ref(false);
    const token = getTokenApi();

    onMounted(() => {
      if (token) router.push("/");
    });

    const schemaForm = Yup.object().shape({
      username: Yup.string().required(true),
      email: Yup.string().email(true).required(true),
      password: Yup.string().required(true),
    });

    const register = async () => {
      formError.value = {};
      loading.value = true;
      try {
        await schemaForm.validate(formData.value, { abortEarly: false });
        try {
          const reponse = await registerApi(formData.value);
          router.push("/login");
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        error.inner.forEach((err) => {
          formError.value[err.path] = err.message;
        });
      }
      loading.value = false;
    };

    return {
      formData,
      register,
      formError,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
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
