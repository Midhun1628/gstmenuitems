<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useRoles } from '../../store/apps/roles'; // We'll create this store next
import { storeToRefs } from 'pinia';
import SvgSprite from '../../components/shared/SvgSprite.vue';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import type { Header, Item } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const page = ref({ title: 'Role Management' });

const breadcrumbs = shallowRef([
  { title: 'Admin', disabled: false, href: '#' },
  { title: 'Roles', disabled: true, href: '#' }
]);

const store = useRoles();
const { fetchRoles, createRole, updateRole, deleteRole } = store;
const { getRoles } = storeToRefs(store);

const searchField = ref('role_name');
const searchValue = ref('');
const dialog = ref(false);
const isEditMode = ref(false);

const roleForm = ref({
  role_id: null,
  role_name: ''
});

const resetForm = () => {
  roleForm.value = {
    role_id: null,
    role_name: ''
  };
  isEditMode.value = false;
};

const openAddRoleModal = () => {
  resetForm();
  dialog.value = true;
};

const handleSubmit = async () => {
  if (isEditMode.value && roleForm.value.role_id !== null) {
    await updateRole(roleForm.value.role_id, roleForm.value);
  } else {
    await createRole(roleForm.value);
  }
  dialog.value = false;
  resetForm();
};

const editRole = (item: any) => {
  roleForm.value = {
    role_id: item.role_id,
    role_name: item.role_name
  };
  isEditMode.value = true;
  dialog.value = true;
};

const itemsSelected = ref<Item[]>([]);
const themeColor = ref('rgb(var(--v-theme-primary))');

onMounted(() => {
  fetchRoles();
});

const headers: Header[] = [
  { text: 'ID', value: 'role_id', sortable: true },
  { text: 'Role Name', value: 'role_name', sortable: true },
  { text: 'Action', value: 'operation' }
];
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <v-row>
    <v-col cols="12">
      <v-card elevation="0" variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
        <v-card-item>
          <v-row justify="space-between" class="align-center">
            <v-col cols="12" md="3">
              <v-text-field
                type="text"
                variant="outlined"
                persistent-placeholder
                placeholder="Search roles..."
                v-model="searchValue"
                density="comfortable"
                hide-details
              >
                <template v-slot:prepend-inner>
                  <SvgSprite name="custom-search" class="text-lightText" style="width: 14px; height: 14px" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <div class="d-flex ga-2 justify-end">
                <v-dialog v-model="dialog" class="role-modal">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="flat" color="primary" rounded="md" v-bind="props" @click="openAddRoleModal">
                      Add Role
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="pa-5">
                      <span class="text-h5">{{ isEditMode ? 'Edit Role' : 'Add Role' }}</span>
                    </v-card-title>
                    <v-divider />
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-label class="mb-2">Role Name</v-label>
                            <v-text-field
                              v-model="roleForm.role_name"
                              placeholder="Enter role name"
                              variant="outlined"
                              density="comfortable"
                              hide-details
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="error" variant="text" @click="dialog = false; resetForm()">Cancel</v-btn>
                      <v-btn color="primary" variant="flat" @click="handleSubmit">
                        {{ isEditMode ? 'Update' : 'Add' }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
          </v-row>
        </v-card-item>
        <v-divider />
        <v-card-text class="pa-0">
          <EasyDataTable
            :headers="headers"
            :items="getRoles"
            table-class-name="customize-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="10"
            v-model:items-selected="itemsSelected"
          >
            <template #item-operation="item">
              <div class="operation-wrapper">
                <v-btn icon color="primary" variant="text" @click="editRole(item)" rounded="md">
                  <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
                </v-btn>
                <v-btn icon color="error" variant="text" @click="deleteRole(item.role_id)" rounded="md">
                  <SvgSprite name="custom-trash" style="width: 20px; height: 20px" />
                </v-btn>
              </div>
            </template>
          </EasyDataTable>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.role-modal {
  width: calc(100% - 48px);
  min-width: 340px;
  max-width: 600px;
}
</style>
