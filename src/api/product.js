import { API_URL } from "@/utils/constants";

export async function getProducts(limit = 1000) {
  try {
    const response = await fetch(
      `${API_URL}/api/products?sort=createdAt:desc&pagination[limit]=${limit}&populate=*`
    );
    const result = await response.json();
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductsCategory(category) {
  try {
    const response = await fetch(
      `${API_URL}/api/products?filters[category][slug][$eq]=${category}&sort=createdAt:desc&populate=*`
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
