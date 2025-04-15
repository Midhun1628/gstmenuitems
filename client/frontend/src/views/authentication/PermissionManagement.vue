<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { usePermissions } from '../../store/apps/permissions';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import SvgSprite from '../../components/shared/SvgSprite.vue';
import 'vue3-easy-data-table/dist/style.css';

const page = ref({ title: 'Permission Management' });
const breadcrumbs = ref([
  { title: 'Permissions', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const store = usePermissions();
const permissions = computed(() => store.getPermissions);
const menuItems = computed(() => store.getMenuItems);

onMounted(() => {
  store.fetchPermissions();
  store.fetchMenuItems();
});

const headers = [
  { text: 'ID', value: 'permission_id' },
  { text: 'Menu Name', value: 'menu_name' },
  { text: 'Permission Action', value: 'permission_action' },
  { text: 'Permission Name', value: 'permission_name' },
  { text: 'Actions', value: 'operation' }
];

const dialog = ref(false);
const isEdit = ref(false);
const form = ref({
  permission_id: 0,
  menu_name: '',
  permission_action: ''
});

const openAddPermission = () => {
  isEdit.value = false;
  form.value = { permission_id: 0, menu_name: '', permission_action: '' };
  dialog.value = true;
};

const openEditPermission = (item) => {
  isEdit.value = true;
  form.value = { ...item };
  dialog.value = true;
};

const savePermission = async () => {
  const payload = {
    menu_name: form.value.menu_name,
    permission_action: form.value.permission_action
  };
  if (isEdit.value) {
    await store.updatePermission(form.value.permission_id, payload);
  } else {
    await store.addPermission(payload);
  }
  dialog.value = false;
};

const deletePermission = async (id:number) => {
  if (confirm('Delete this permission?')) {
    await store.deletePermission(id);
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
                  <v-btn v-bind="props" color="primary" variant="flat" rounded="md" @click="openAddPermission">
                    Add Permission
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="pa-5">
                    <span class="text-h5">{{ isEdit ? 'Edit' : 'Add' }} Permission</span>
                  </v-card-title>
                  <v-divider />
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-label class="mb-2">Menu</v-label>
                          <v-select
                            v-model="form.menu_name"
                            :items="menuItems.map(menu => menu.menu_name)"
                            variant="outlined"
                            placeholder="Select Menu"
                            hide-details
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-label class="mb-2">Permission Action</v-label>
                          <v-select
                            v-model="form.permission_action"
                            :items="['create', 'view', 'edit', 'delete']"
                            variant="outlined"
                            placeholder="Select Action"
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
                    <v-btn color="primary" variant="flat" @click="savePermission">
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
            :items="permissions"
            table-class-name="customize-table"
            :rows-per-page="10"
          >
            <template #item-operation="{ permission_id }">
              <v-btn icon variant="text" color="primary" @click="openEditPermission(permissions.find(p => p.permission_id === permission_id))">
                <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
              </v-btn>
              <v-btn icon variant="text" color="error" @click="deletePermission(permission_id)">
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
