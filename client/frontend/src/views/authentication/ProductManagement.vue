<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useProducts } from '../../store/apps/products';
import BaseBreadcrumb from '../../components/shared/BaseBreadcrumb.vue';
import SvgSprite from '../../components/shared/SvgSprite.vue';
import type { Header, Item } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { useCategories } from '../../store/apps/products'; // new import


const categoryStore = useCategories();
const categories = computed(() => categoryStore.categories);

const page = ref({ title: 'Product Management' });
const breadcrumbs = ref([
  { title: 'Product', disabled: false, href: '#' },
  { title: 'List', disabled: true, href: '#' }
]);

const store = useProducts();
const getProducts = computed(() => store.getProducts);

//category used for adding and editing

onMounted(async () => {
  await Promise.all([
    store.fetchProducts(),
    categoryStore.fetchCategories()
  ]);
});

onMounted(() => {
  store.fetchProducts();
});

const searchField = ref('name');
const searchValue = ref('');
const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Product Name', value: 'name', sortable: true },
  { text: 'Category', value: 'category', sortable: true },
  { text: 'Price', value: 'price', sortable: true },
  { text: 'Qty', value: 'qty', sortable: true },
  { text: 'Action', value: 'operation' }
];

const themeColor = ref('rgb(var(--v-theme-primary))');
const itemsSelected = ref<Item[]>([]);

const dialog = ref(false);
const isEdit = ref(false);
const form = ref({ id: null, name: '', category: '', price: '', qty: '' });

const openAddProduct = () => {
  isEdit.value = false;
  form.value = { id: null, name: '', category: '', price: '', qty: '' };
  dialog.value = true;
};

const openEditProduct = (product) => {
  isEdit.value = true;
  form.value = { ...product };
  dialog.value = true;
};

const saveProduct = async () => {
  if (isEdit.value) {
    await store.updateProduct(form.value);
  } else {
    await store.addProduct(form.value);
  }
  dialog.value = false;
};

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await store.deleteProduct(id);
  }
};
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
            <v-col cols="12" md="3">
              <div class="d-flex ga-2 justify-end">
                <v-dialog v-model="dialog" class="customer-modal">
                  <template v-slot:activator="{ props }">
                    <v-btn variant="flat" color="primary" rounded="md" v-bind="props" @click="openAddProduct">
                      Add Product
                    </v-btn>
                  </template>
                  <v-card>
                    <perfect-scrollbar style="max-height: calc(100vh - 48px)">
                      <v-card-title class="pa-5">
                        <span class="text-h5">{{ isEdit ? 'Edit Product' : 'Add Product' }}</span>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col md="3" cols="12" class="text-center">
                              
                            </v-col>
                            <v-col md="9" cols="12">
                              <v-row>
                                <v-col cols="12">
                                  <v-label class="mb-2">Product Name</v-label>
                                  <v-text-field
                                    v-model="form.name"
                                    placeholder="Enter product name"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12">
  <v-label class="mb-2">Category</v-label>
  <v-select
  v-model="form.category"
  :items="categories"
  item-title="category_name"
  item-value="category_id"
  label="Select category"
  variant="outlined"
  density="comfortable"
  hide-details
/>

</v-col>

                                <v-col cols="12" md="6">
                                  <v-label class="mb-2">Price</v-label>
                                  <v-text-field
                                    v-model="form.price"
                                    type="number"
                                    placeholder="Enter price"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
                                  />
                                </v-col>
                                <v-col cols="12" md="6">
                                  <v-label class="mb-2">Quantity</v-label>
                                  <v-text-field
                                    v-model="form.qty"
                                    type="number"
                                    placeholder="Enter quantity"
                                    variant="outlined"
                                    density="comfortable"
                                    hide-details
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
                        <v-btn color="error" variant="text" @click="dialog = false">Cancel</v-btn>
                        <v-btn color="primary" variant="flat" @click="saveProduct">
                          {{ isEdit ? 'Update' : 'Add' }}
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
            :items="getProducts"
            table-class-name="customize-table invoice-table"
            :theme-color="themeColor"
            :search-field="searchField"
            :search-value="searchValue"
            :rows-per-page="10"
            v-model:items-selected="itemsSelected"
          >
            <template #item-operation="{ id }">
              <div class="operation-wrapper">
                <v-btn icon color="primary" variant="text" @click="openEditProduct(getProducts.find(p => p.id === id))" rounded="md">
                  <SvgSprite name="custom-edit-outline" style="width: 20px; height: 20px" />
                </v-btn>
                <v-btn icon color="error" variant="text" @click="deleteProduct(id)" rounded="md">
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
