import { defineStore } from 'pinia';
import axios from '../../../axios/axiosInstance';

export const usePermissions = defineStore('permissions', {
  state: () => ({
    permissions: [],
    menuItems: []
  }),

  actions: {
    async fetchPermissions() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/permission/permissions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.permissions = res.data;
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    },


    async fetchMenuItems() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/menu/menus', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.menuItems = res.data;
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    },

    async addPermission(data) {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/permission/permissions', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchPermissions();
    },

    async updatePermission(id:number, data) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/permission/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchPermissions();
    },

    async deletePermission(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/permission/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchPermissions();
    }
  },

  getters: {
    getPermissions: (state) => state.permissions,
    getMenuItems: (state) => state.menuItems
  }
});
