// stores/apps/menus.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export const useMenus = defineStore('menus', {
  state: () => ({
    menus: [] as { menu_id: number; menu_name: string }[],
  }),

  getters: {
    getMenus(state) {
      return state.menus;
    },
  },

  actions: {
    async fetchMenus() {
      try {
        const response = await axios.get('http://localhost:3000/menu/menus');
        this.menus = response.data;
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      }
    },

    async createMenu(menuData: { menu_name: string }) {
      try {
        await axios.post('http://localhost:3000/menu/menus', menuData);
        await this.fetchMenus();
      } catch (error) {
        console.error('Failed to create menu item:', error);
      }
    },

    async updateMenu(menu_id: number, menuData: { menu_name: string }) {
      try {
        await axios.put(`http://localhost:3000/menu/menus/${menu_id}`, menuData);
        await this.fetchMenus();
      } catch (error) {
        console.error('Failed to update menu item:', error);
      }
    },

    async deleteMenu(menu_id: number) {
      try {
        await axios.delete(`http://localhost:3000/menu/menus/${menu_id}`);
        await this.fetchMenus();
      } catch (error) {
        console.error('Failed to delete menu item:', error);
      }
    },
  },
});
