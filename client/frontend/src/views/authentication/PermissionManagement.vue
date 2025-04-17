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
