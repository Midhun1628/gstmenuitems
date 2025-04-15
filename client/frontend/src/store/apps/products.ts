import { defineStore } from 'pinia';
import axios from '../../../axios/axiosInstance';

export const useProducts = defineStore('products', {
  state: () => ({
    products: []
  }),
  getters: {
    getProducts: (state) => state.products
  },
  actions: {
    async fetchProducts() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/product/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.products = response.data.map((product: any) => ({
          id: product.product_id,
          name: product.product_name,
          category: product.category_name,
          price: product.retail_price,
          qty: product.stock_quantity,
          
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    async addProduct(product) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/product/products', {
          name: product.product_name,
          id: product.product_id,
          price: product.purchase_unit_price,
          stock: product.stock_quantity
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchProducts();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },

    async updateProduct(product) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/product/products/${product.id}`, {
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.qty
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchProducts();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },

    async deleteProduct(id:number) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/product/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
});
