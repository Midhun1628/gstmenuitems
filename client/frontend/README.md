# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).


<!-- 

role_permission management converted from table to switches

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRolePermissions } from '../../store/apps/rolePermission';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const page = ref({ title: 'Role Permission Management' });
const breadcrumbs = ref([
  { title: 'Role Permissions', disabled: false, href: '#' },
  { title: 'Cards', disabled: true, href: '#' }
]);

const store = useRolePermissions();
const roles = computed(() => store.getRoles);
const permissions = computed(() => store.getPermissions);
const rolePermissions = computed(() => store.getRolePermissions);
const menuItems = computed(() => {
  const uniqueMenus = new Set(permissions.value.map(p => p.menu_name));
  return Array.from(uniqueMenus);
});

onMounted(() => {
  store.fetchRolePermissions();
  store.fetchRoles();
  store.fetchPermissions();
});

// Check if the role has permission for a menu and action
const hasRolePermission = (roleName: string, menuName: string, action: string) => {
  const permName = `${menuName}_${action}`;
  return rolePermissions.value.some(
    (rp) => rp.role_name === roleName && rp.permission_name === permName
  );
};

// Toggle permission for a role
const toggleRolePermission = async (roleName: string, menuName: string, action: string, enabled: boolean) => {
  const permission_name = `${menuName}_${action}`;
  try {
    if (enabled) {
      await store.addRolePermission({ role_name: roleName, permission_name });
      toast.success('Permission assigned');
    } else {
      const existing = rolePermissions.value.find(
        (rp) => rp.role_name === roleName && rp.permission_name === permission_name
      );
      if (existing) {
        await store.deleteRolePermission(existing.role_permission_id);
        toast.info('Permission removed');
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.error || 'Error toggling permission');
  }
};
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <div class="role-cards">
    <div
      v-for="role in roles"
      :key="role.role_id"
      class="role-card"
    >
      <h2 class="role-title">{{ role.role_name }}</h2>

      <div
        v-for="menuName in menuItems"
        :key="menuName"
        class="menu-permission"
      >
        <h3 class="menu-title">{{ menuName }}</h3>
        <div class="permissions-container">
          <div
            v-for="action in ['view', 'create', 'update', 'delete']"
            :key="action"
            class="permission-item"
          >
            <label :for="`${role.role_name}-${menuName}-${action}`" class="text-sm capitalize">{{ action }}</label>
            <input
              type="checkbox"
              :id="`${role.role_name}-${menuName}-${action}`"
              class="toggle-switch"
              :checked="hasRolePermission(role.role_name, menuName, action)"
              @change="toggleRolePermission(role.role_name, menuName, action, $event.target.checked)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.role-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: start;
  padding: 20px;
}

.role-card {
  width: 350px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.role-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 16px;
}

.menu-permission {
  margin-bottom: 20px;
}

.menu-title {
  font-weight: 600;
  margin-bottom: 10px;
}

.permissions-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.permission-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 48%;
}

.toggle-switch {
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ddd;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch:checked {
  background-color: #4ade80;
}

.toggle-switch::before {
  content: "";
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s;
}

.toggle-switch:checked::before {
  transform: translateX(20px);
}
</style>



permission management

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePermissions } from '../../store/apps/permissions';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const page = ref({ title: 'Permission Management' });
const breadcrumbs = ref([
  { title: 'Permissions', disabled: false, href: '#' },
  { title: 'Cards', disabled: true, href: '#' }
]);

const store = usePermissions();
const permissions = computed(() => store.getPermissions);
const menuItems = computed(() => store.getMenuItems);

onMounted(() => {
  store.fetchPermissions();
  store.fetchMenuItems();
});

// Helper: get permission by menu_name and action
const hasPermission = (menuName: string, action: string) => {
  return permissions.value.some(
    (perm) => perm.menu_name === menuName && perm.permission_action === action
  );
};

const togglePermission = async (menuName: string, action: string, enabled: boolean) => {
  try {
    if (enabled) {
      // Add permission
      const payload = { menu_name: menuName, permission_action: action };
      const res = await store.addPermission(payload);
      toast.success(res.message || 'Permission added');
    } else {
      // Delete permission
      const perm = permissions.value.find(
        (p) => p.menu_name === menuName && p.permission_action === action
      );
      if (perm) {
        const res = await store.deletePermission(perm.permission_id);
        toast.error(res.message || 'Permission removed');
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.error || 'An error occurred');
  }
};
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <div class="cards-wrapper">
    <div
      v-for="menu in menuItems"
      :key="menu.menu_id"
      class="card"
    >
      <h2 class="card-title">{{ menu.menu_name }}</h2>

      <div class="permissions-container">
        <div
          v-for="action in ['view', 'create', 'update', 'delete']"
          :key="action"
          class="permission-item"
        >
          <label :for="${menu.menu_name}-${action}" class="text-sm font-medium capitalize">{{ action }}</label>
          <input
            type="checkbox"
            :id="${menu.menu_name}-${action}"
            class="toggle-switch"
            :checked="hasPermission(menu.menu_name, action)"
            @change="togglePermission(menu.menu_name, action, $event.target.checked)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: start;
  padding: 20px;
}

/* Card Structure */
.card {
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title Styling */
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Container for the Permission Switches */
.permissions-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Each Permission Item */
.permission-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Toggle Switch */
.toggle-switch {
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ddd;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch:checked {
  background-color: #4ade80;
}

.toggle-switch::before {
  content: "";
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s;
}

.toggle-switch:checked::before {
  transform: translateX(20px);
}
</style>


permission management with live update for add and delete the permissions

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePermissions } from '../../store/apps/permissions';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const page = ref({ title: 'Permission Management' });
const breadcrumbs = ref([
  { title: 'Permissions', disabled: false, href: '#' },
  { title: 'Cards', disabled: true, href: '#' }
]);

const store = usePermissions();
const permissions = computed(() => store.getPermissions);
const menuItems = computed(() => store.getMenuItems);

onMounted(() => {
  store.fetchPermissions();
  store.fetchMenuItems();
});

// Helper: get permission by menu_name and action
const hasPermission = (menuName: string, action: string) => {
  return permissions.value.some(
    (perm) => perm.menu_name === menuName && perm.permission_action === action
  );
};

const togglePermission = async (menuName: string, action: string, enabled: boolean) => {
  try {
    if (enabled) {
      // Add permission
      const payload = { menu_name: menuName, permission_action: action };
      const res = await store.addPermission(payload);
      toast.success(res.message || 'Permission added');
    } else {
      // Delete permission
      const perm = permissions.value.find(
        (p) => p.menu_name === menuName && p.permission_action === action
      );
      if (perm) {
        const res = await store.deletePermission(perm.permission_id);
        toast.error(res.message || 'Permission removed');
      }
    }
  } catch (err) {
    toast.error(err.response?.data?.error || 'An error occurred');
  }
};
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <div class="cards-wrapper">
    <div
      v-for="menu in menuItems"
      :key="menu.menu_id"
      class="card"
    >
      <h2 class="card-title">{{ menu.menu_name }}</h2>

      <div class="permissions-container">
        <div
          v-for="action in ['view', 'create', 'update', 'delete']"
          :key="action"
          class="permission-item"
        >
          <label :for="`${menu.menu_name}-${action}`" class="text-sm font-medium capitalize">{{ action }}</label>
          <input
            type="checkbox"
            :id="`${menu.menu_name}-${action}`"
            class="toggle-switch"
            :checked="hasPermission(menu.menu_name, action)"
            @change="togglePermission(menu.menu_name, action, $event.target.checked)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: start;
  padding: 20px;
}

/* Card Structure */
.card {
  width: 250px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Title Styling */
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Container for the Permission Switches */
.permissions-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Each Permission Item */
.permission-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Toggle Switch */
.toggle-switch {
  width: 40px;
  height: 20px;
  appearance: none;
  background-color: #ddd;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-switch:checked {
  background-color: #4ade80;
}

.toggle-switch::before {
  content: "";
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 9999px;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: transform 0.3s;
}

.toggle-switch:checked::before {
  transform: translateX(20px);
}
</style>



 -->



