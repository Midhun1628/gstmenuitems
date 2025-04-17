import { defineStore } from 'pinia';
import axios from '../../../axios/axiosInstance';

export const useRoles = defineStore('roles', {
  state: () => ({
    roles: []
  }),

  getters: {
    getRoles: (state) => state.roles
  },

  actions: {
    async fetchRoles() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/role/roles', {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.roles = response.data.map((role: any) => ({
          role_id: role.role_id,
          role_name: role.role_name
        }));
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    },

    async createRole(roleData: object) {
      try {
        const token = localStorage.getItem('token');
       const res= await axios.post('http://localhost:3000/role/roles', roleData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        await this.fetchRoles();
        return res.data
      } catch (error) {
        console.error('Failed to create role:', error.message);
      }
    },

    async updateRole(role_id: number, updatedData: object) {
      try {
        const token = localStorage.getItem('token');
       const res= await axios.put(`http://localhost:3000/role/roles/${role_id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        await this.fetchRoles();
        return res.data
      } catch (error) {
        console.error('Failed to update role:', error);
      }
    },

    async deleteRole(role_id: number) {
      try {
        const token = localStorage.getItem('token');
       const res= await axios.delete(`http://localhost:3000/role/roles/${role_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.roles = this.roles.filter(r => r.role_id !== role_id);
        return res.data;
      } catch (error) {
        console.error('Failed to delete role:', error);
      }
    }
  }
});
