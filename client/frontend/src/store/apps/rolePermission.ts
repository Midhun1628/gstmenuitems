import { defineStore } from 'pinia';
import axios from '../../../axios/axiosInstance';

export const useRolePermissions = defineStore('rolePermissions', {
  state: () => ({
    rolePermissions: [],
    roles: [],
    permissions: []
  }),

  actions: {
    async fetchRolePermissions() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/rolePermission/rolePermissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.rolePermissions = res.data;
    },

    async fetchRoles() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/role/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.roles = res.data;
    },

    async fetchPermissions() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/permission/permissions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.permissions = res.data;
    },

    async addRolePermission(data) {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/rolePermission/rolePermissions', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchRolePermissions();
    },

    async updateRolePermission(id: number, data) {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/rolePermission/rolePermissions/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchRolePermissions();
    },

    async deleteRolePermission(id: number) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/rolePermission/rolePermissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await this.fetchRolePermissions();
    }
  },

  getters: {
    getRolePermissions: (state) => state.rolePermissions,
    getRoles: (state) => state.roles,
    getPermissions: (state) => state.permissions
  }
});
