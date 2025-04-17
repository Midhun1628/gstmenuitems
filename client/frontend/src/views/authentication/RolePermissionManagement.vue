<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRolePermissions } from '../../store/apps/rolePermission';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const page = ref({ title: 'Role Permission Management' });
const breadcrumbs = ref([
  { title: 'Role Permissions', disabled: false, href: '/rolePermission-management' },
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
      if (existing?.role_permission_id) {
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
        <div class="menu-divider">
  <svg viewBox="0 0 120 10" preserveAspectRatio="none" class="wavy-line">
    <path d="M0,5 Q30,0 60,5 T120,5" fill="none" stroke="#e0e0e0" stroke-width="2" />
  </svg>
</div>
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
  background-color: grey;
  color: #ddd;
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
  background-color:blue;
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

.menu-divider {
  margin: 4px 0 10px;
}

.wavy-line {
  width: 100%;
  height: 10px;
}

</style>


