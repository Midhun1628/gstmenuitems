import { defineStore } from 'pinia';
import axios from 'axios';

export const useCustomers = defineStore('customers', {
  state: () => ({
    customers: []
  }),
  getters: {
    getCustomers: (state) => state.customers
  },
  actions: {
    async fetchCustomers() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/user/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

            this.customers = response.data.map(user => ({
               user_id: user.user_id,
                // Use the username from the backend if available, or else the concatenated names:
               username: user.username || `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
                email: user.email,
                role_id: user.role_id,
                first_name: user.first_name,  // for editing
                last_name: user.last_name     // for editing
              }));
        
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },

    async createCustomer(customerData: object) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3000/user/users', customerData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        await this.fetchCustomers();
      } catch (error) {
        console.error('Failed to create user:', error.message);
      }
    },

    async updateCustomer(user_id:Number, updatedData :object) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/user/users/${user_id}`, updatedData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        await this.fetchCustomers();
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    },

    async deleteCustomer(user_id: number) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/user/users/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        // Remove the user locally
        this.customers = this.customers.filter(c => c.user_id !== user_id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
    
  }
});
