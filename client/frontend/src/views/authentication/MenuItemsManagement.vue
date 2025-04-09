<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
import { useMenus } from '../../store/apps/menuItems';
import { storeToRefs } from 'pinia';
import type { Header, Item } from 'vue3-easy-data-table';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Menu Management' });
const breadcrumbs = ref([
  { title: 'Menu-items', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const searchValue=ref('')
const store = useMenus();
const { fetchMenus, createMenu, updateMenu, deleteMenu } = store;
const { getMenus } = storeToRefs(store);

const dialog = ref(false);
const isEditMode = ref(false);
const form = ref({ menu_id: null as number | null, menu_name: '' });

const openAddModal = () => {
  form.value = { menu_id: null, menu_name: '' };
  isEditMode.value = false;
  dialog.value = true;
};

const editMenu = (item: any) => {
  form.value = { menu_id: item.menu_id, menu_name: item.menu_name };
  isEditMode.value = true;
  dialog.value = true;
};

const handleSubmit = async () => {
  if (isEditMode.value && form.value.menu_id !== null) {
    await updateMenu(form.value.menu_id, { menu_name: form.value.menu_name });
  } else {
    await createMenu({ menu_name: form.value.menu_name });
  }
  dialog.value = false;
};

onMounted(() => {
  fetchMenus();
});

const headers: Header[] = [
  { text: 'Menu ID', value: 'menu_id', sortable: true },
  { text: 'Menu Name', value: 'menu_name', sortable: true },
  { text: 'Actions', value: 'operation' },
];

const itemsSelected = ref<Item[]>([]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs" />
  <v-card elevation="0" variant="outlined" class="bg-surface" rounded="lg">
    <v-card-item>
      <v-row justify="space-between" class="align-center" >

        <v-col cols="12" md="3">
              <v-text-field
                type="text"
                variant="outlined"
                persistent-placeholder
                placeholder="Search products..."
                v-model="searchValue"
                density="comfortable"
                hide-details
              >
                <template v-slot:prepend-inner>
                  <SvgSprite name="custom-search" class="text-lightText" style="width: 14px; height: 14px" />
                </template>
              </v-text-field>
            </v-col>
        
        <v-col cols="12" md="3" class="d-flex justify-end">
          <v-dialog v-model="dialog">
            <template #activator="{ props }">
              <v-btn color="primary" variant="flat" rounded="md" v-bind="props" @click="openAddModal">
                Add Menu
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="pa-5">
                <span class="text-h5">{{ isEditMode ? 'Edit Menu' : 'Add Menu' }}</span>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="form.menu_name"
                  label="Menu Name"
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
        :items="getMenus"
        table-class-name="customize-table invoice-table"
        :rows-per-page="10"
        v-model:items-selected="itemsSelected"
      >
        <template #item-operation="item">
          <div class="operation-wrapper">
            <v-btn icon color="primary" variant="text" @click="editMenu(item)" rounded="md">
              <SvgSprite name="custom-edit-outline" />
            </v-btn>
            <v-btn icon color="error" variant="text" @click="deleteMenu(item.menu_id)" rounded="md">
              <SvgSprite name="custom-trash" />
            </v-btn>
          </div>
        </template>
      </EasyDataTable>
    </v-card-text>
  </v-card>
</template>
