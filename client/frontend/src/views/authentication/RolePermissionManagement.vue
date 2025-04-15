<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRolePermissions } from '../../store/apps/rolePermission';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import SvgSprite from '../../components/shared/SvgSprite.vue';
import 'vue3-easy-data-table/dist/style.css';

const page = ref({ title: 'Role Permission Management' });
const breadcrumbs = ref([
  { title: 'Role Permissions', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const store = useRolePermissions();
const rolePermissions = computed(() => store.getRolePermissions);
const roles = computed(() => store.getRoles);
const permissions = computed(() => store.getPermissions);

onMounted(() => {
  store.fetchRolePermissions();
  store.fetchRoles();
  store.fetchPermissions();
});

const headers = [
  { text: 'ID', value: 'role_permission_id',sortable: true },
  { text: 'Role', value: 'role_name',sortable: true },
  { text: 'Permission', value: 'permission_name',sortable: true },
  { text: 'Actions', value: 'operation',sortable: true }
];

const dialog = ref(false);
const isEdit = ref(false);
const form = ref({
  role_permission_id: 0,
  role_name: '',
  permission_name: ''
});

const openAdd = () => {
  isEdit.value = false;
  form.value = { role_permission_id: 0, role_name: '', permission_name: '' };
  dialog.value = true;
};

const openEdit = (item) => {
  isEdit.value = true;
  form.value = { ...item };
  dialog.value = true;
};

const save = async () => {
  const payload = {
    role_name: form.value.role_name,
    permission_name: form.value.permission_name
  };
  if (isEdit.value) {
    await store.updateRolePermission(form.value.role_permission_id, payload);
  } else {
    await store.addRolePermission(payload);
  }
  dialog.value = false;
};

const remove = async (id: number) => {
  if (confirm('Delete this role permission?')) {
    await store.deleteRolePermission(id);
  }
};
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <v-row>
    <v-col cols="12">
      <v-card elevation="0" variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
        <v-card-item>
          <v-row justify="end">
            <v-col cols="12" md="3">
              <v-dialog v-model="dialog" class="customer-modal">
                <template #activator="{ props }">
                  <v-btn v-bind="props" color="primary" variant="flat" rounded="md" @click="openAdd">
                    Add Role Permission
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-5">
                    <span class="text-h5">{{ isEdit ? 'Edit' : 'Add' }} Role Permission</span>
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-label class="mb-2">Role</v-label>
                          <v-select
                            v-model="form.role_name"
                            :items="roles.map(r => r.role_name)"
                            variant="outlined"
                            placeholder="Select Role"
                            hide-details
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-label class="mb-2">Permission</v-label>
                          <v-select
                            v-model="form.permission_name"
                            :items="permissions.map(p => p.permission_name)"
                            variant="outlined"
                            placeholder="Select Permission"
                            hide-details
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-divider />
                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="error" variant="text" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="primary" variant="flat" @click="save">
                      {{ isEdit ? 'Update' : 'Create' }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider />
        <v-card-text class="pa-0">
          <EasyDataTable
            :headers="headers"
            :items="rolePermissions"
            table-class-name="customize-table"
            :rows-per-page="10"
          >
            <template #item-operation="{ role_permission_id }">
              <v-btn icon variant="text" color="primary" @click="openEdit(rolePermissions.find(p => p.role_permission_id === role_permission_id))">
                <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
              </v-btn>
              <v-btn icon variant="text" color="error" @click="remove(role_permission_id)">
                <SvgSprite name="custom-trash" style="width: 20px; height: 20px" />
              </v-btn>
            </template>
          </EasyDataTable>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.customer-modal {
  width: calc(100% - 48px);
  min-width: 340px;
  max-width: 820px;
}
</style>
