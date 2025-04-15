<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoles } from '../../store/apps/roles.ts';
import { storeToRefs } from 'pinia';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Role Management' });
const breadcrumbs = ref([
  { title: 'Roles', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const store = useRoles();
const { fetchRoles, createRole, updateRole, deleteRole } = store;
const { getRoles } = storeToRefs(store);

const dialog = ref(false);
const isEditMode = ref(false);
const form = ref({ role_id: null as number | null, role_name: '' });

const openAddModal = () => {
  form.value = { role_id: null, role_name: '' };
  isEditMode.value = false;
  dialog.value = true;
};

const editRole = (item: any) => {
  form.value = { role_id: item.role_id, role_name: item.role_name };
  isEditMode.value = true;
  dialog.value = true;
};

const handleSubmit = async () => {
  if (isEditMode.value && form.value.role_id !== null) {
    await updateRole(form.value.role_id, { role_name: form.value.role_name });
  } else {
    await createRole({ role_name: form.value.role_name });
  }
  dialog.value = false;
};

onMounted(() => {
  fetchRoles();
});

const headers = [
  { text: 'Role ID', value: 'role_id', sortable: true },
  { text: 'Role Name', value: 'role_name', sortable: true },
  { text: 'Actions', value: 'operation' },
];

const itemsSelected = ref([]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />

  <v-card elevation="0" variant="outlined" class="bg-surface" rounded="lg">
    <v-card-item>
      <v-row justify="space-between" class="align-center">
        <v-col cols="12" md="3" class="d-flex justify-end">
          <v-dialog v-model="dialog">
            <template #activator="{ props }">
              <v-btn color="primary" variant="flat" rounded="md" v-bind="props" @click="openAddModal">
                Add Role
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="pa-5">
                <span class="text-h5">{{ isEditMode ? 'Edit Role' : 'Add Role' }}</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="form.role_name"
                  label="Role Name"
                  variant="outlined"
                  hide-details
                  density="comfortable"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn text color="error" @click="dialog = false">Cancel</v-btn>
                <v-btn color="primary" variant="flat" @click="handleSubmit">
                  {{ isEditMode ? 'Update' : 'Add' }}
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
        :items="getRoles"
        :rows-per-page="10"
        table-class-name="customize-table"
        v-model:items-selected="itemsSelected"
      >
        <template #item-operation="item">
          <div class="operation-wrapper">
            <v-btn icon color="primary" variant="text" @click="editRole(item)" rounded="md">
              <SvgSprite name="custom-edit-outline" />
            </v-btn>
            <v-btn icon color="error" variant="text" @click="deleteRole(item.role_id)" rounded="md">
              <SvgSprite name="custom-trash" />
            </v-btn>
          </div>
        </template>
      </EasyDataTable>
    </v-card-text>
  </v-card>
</template>
