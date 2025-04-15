<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue';
import { useCustomers } from '../../store/apps/users.ts';
import { storeToRefs } from 'pinia';
import SvgSprite from '../../components/shared/SvgSprite.vue';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import type { Header, Item } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const page = ref({ title: 'User Management' });

const breadcrumbs = shallowRef([
  { title: 'User', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const store = useCustomers();
const { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } = store;
const { getCustomers } = storeToRefs(store);

const searchField = ref('name');
const searchValue = ref('');
const dialog = ref(false);
const isEditMode = ref(false);

const userForm = ref({
  user_id: null,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  location: '',
  role_id: ''
});

const resetForm = () => {
  userForm.value = {
    user_id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    location: '',
    role_id: ''
  };
  isEditMode.value = false;
};

const openAddUserModal = () => {
  resetForm();
  dialog.value = true;
};

const handleSubmit = async () => {
  if (isEditMode.value && userForm.value.user_id !== null) {
    await updateCustomer(userForm.value.user_id, userForm.value);
  } else {
    await createCustomer(userForm.value);
  }
  dialog.value = false;
  resetForm();
};

const editUser = (item: any) => {
  userForm.value = {
    user_id: item.user_id,
    username: item.username,
    email: item.email,
    first_name: item.first_name || '',
    last_name: item.last_name || '',
    password: '',
    role_id: item.role_id,
    location: item.location || ''
  };
  isEditMode.value = true;
  dialog.value = true;
};


const itemsSelected = ref<Item[]>([]);
const themeColor = ref('rgb(var(--v-theme-primary))');

onMounted(() => {
  fetchCustomers();
});

const headers: Header[] = [
  { text: 'ID', value: 'user_id', sortable: true },
  { text: 'Username', value: 'username', sortable: true },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Role ID', value: 'role_id', sortable: true },
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
                placeholder="Search users..."
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
                <v-dialog v-model="dialog" class="customer-modal">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="flat" color="primary" rounded="md" v-bind="props" @click="openAddUserModal">
                      Add User
                    </v-btn>
                  </template>
                  <v-card>
                    <perfect-scrollbar style="max-height: calc(100vh - 48px)">
                      <v-card-title class="pa-5">
                        <span class="text-h5">{{ isEditMode ? 'Edit User' : 'Add User' }}</span>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col md="3" cols="12" class="text-center">
                              <v-avatar size="72" variant="outlined" color="primary" class="dashed">
                                <img src="@/assets/images/users/avatar-1.png" width="72" alt="profile" />
                                <input type="file" aria-label="upload" class="preview-upload" />
                              </v-avatar>
                            </v-col>
                            <v-col md="9" cols="12">
                              <v-row>
                                <v-col cols="12">
                                  <v-label class="mb-2">Username</v-label>
                                  <v-text-field
                                    v-model="userForm.username"
                                    placeholder="Enter username"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-label class="mb-2">First Name</v-label>
                                  <v-text-field
                                    v-model="userForm.first_name"
                                    placeholder="Enter first name"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-label class="mb-2">Last Name</v-label>
                                  <v-text-field
                                    v-model="userForm.last_name"
                                    placeholder="Enter last name"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-label class="mb-2">Email</v-label>
                                  <v-text-field
                                    v-model="userForm.email"
                                    type="email"
                                    placeholder="Enter email"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-label class="mb-2">Password</v-label>
                                  <v-text-field
                                    v-model="userForm.password"
                                    type="password"
                                    placeholder="Enter password"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
                                  <v-label class="mb-2">Role ID</v-label>
                                  <v-autocomplete
                                    v-model="userForm.role_id"
                                    :items="['1', '2', '3']"
                                    label="Select Role ID"
                                    variant="outlined"
                                    hide-details
                                    density="comfortable"
                                  />
                                </v-col>
                               
                              </v-row>
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
                    </perfect-scrollbar>
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
            :items="getCustomers"
            table-class-name="customize-table invoice-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="10"
            v-model:items-selected="itemsSelected"
          >
            <template #item-name="{ name }">
              <h6 class="text-subtitle-1 mb-0">{{ name }}</h6>
            </template>
            <template #item-operation="item">
              <div class="operation-wrapper">
                <v-btn icon color="primary" variant="text" @click="editUser(item)" rounded="md">
                  <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
                </v-btn>
                <v-btn icon color="error" variant="text" @click="deleteCustomer(item.user_id)" rounded="md">
                  
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
.customer-modal {
  width: calc(100% - 48px);
  min-width: 340px;
  max-width: 820px;
}
</style>
