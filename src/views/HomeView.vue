<template>
  <BasicLayout>
    <h1>Últimos productos</h1>
    <div class="ui grid">
      <div
        class="sixteen wide mobile eight wide table four wide computer column"
        v-for="product in products"
        :key="product.id"
      >
        <Product :product="product" />
      </div>
    </div>
  </BasicLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import Product from "@/components/Product.vue";
import { getProducts } from "@/api/product";

export default {
  name: "HomeView",
  components: {
    BasicLayout,
    Product,
  },
  setup() {
    let products = ref(null);
    onMounted(async () => {
      const response = await getProducts(20);
      products.value = response;
    });
    return { products };
  },
};
</script>
