import axios from 'axios';

import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email:string, password :string ) {
      try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        this.token = response.data.accessToken;
        localStorage.setItem('token', this.token);
      } catch (error) {
        console.error(error.response.data);
        throw error;
      }
    },
    
    async register(username :string, email:string, password :string,firstname :string,lastname :string,role_id:number) {
      try {
        await axios.post('http://localhost:3000/user/register', { username, email, password,first_name: firstname,last_name: lastname,role_id });
      } catch (error) {
        console.error( "error is",error.response.data);
        throw error;
      }
    },
    
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});
