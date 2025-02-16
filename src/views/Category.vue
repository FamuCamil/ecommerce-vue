<template>
  <BasicLayout>
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
import BasicLayout from "@/layouts/BasicLayout.vue";
import Product from "@/components/Product.vue";
import { useRoute } from "vue-router";
import { getProductsCategory } from "@/api/product";
import { onMounted, ref } from "vue";
export default {
  name: "Category",
  components: { BasicLayout, Product },
  watch: {
    $route(to, from) {
      this.getProducts(to.params.category);
    },
  },
  setup() {
    const { params } = useRoute();
    let products = ref(null);

    onMounted(() => {
      getProducts(params.category);
    });

    const getProducts = async (category) => {
      const response = await getProductsCategory(category);
      products.value = response;
    };

    return { getProducts, products };
  },
};
</script>

<style></style>
