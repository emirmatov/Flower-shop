<template>
  <div class="admin-page">
    <!-- Шапка админки -->
    <div class="admin-header">
      <h1>🌸 Управление товарами</h1>
      <div class="header-btns">
        <Button label="Заказы" icon="pi pi-list" outlined @click="router.push('/admin/orders')" />
        <Button
          label="Выйти"
          icon="pi pi-sign-out"
          severity="secondary"
          text
          @click="handleLogout"
        />
      </div>
    </div>

    <!-- Кнопка добавить -->
    <Button
      label="Добавить товар"
      icon="pi pi-plus"
      class="add-product-btn"
      @click="openDialog()"
    />

    <!-- Таблица товаров -->
    <DataTable :value="products" stripedRows class="products-table">
      <Column field="image" header="Фото">
        <template #body="{ data }">
          <img :src="data.image" :alt="data.name" class="table-image" />
        </template>
      </Column>
      <Column field="name" header="Название" />
      <Column field="category" header="Категория" />
      <Column field="price" header="Цена">
        <template #body="{ data }"> {{ data.price }} ₸ </template>
      </Column>
      <Column header="Действия">
        <template #body="{ data }">
          <div class="action-btns">
            <Button icon="pi pi-pencil" rounded outlined size="small" @click="openDialog(data)" />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              size="small"
              severity="danger"
              @click="deleteProduct(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Диалог добавить/редактировать -->
    <Dialog
      v-model:visible="dialogVisible"
      :header="editingProduct ? 'Редактировать товар' : 'Добавить товар'"
      modal
      class="product-dialog"
    >
      <div class="dialog-form">
        <div class="field">
          <label>Название *</label>
          <InputText v-model="form.name" placeholder="Название товара" />
        </div>

        <div class="field">
          <label>Цена (₸) *</label>
          <InputNumber v-model="form.price" placeholder="0" :min="0" />
        </div>

        <div class="field">
          <label>Категория *</label>
          <Select v-model="form.category" :options="categories" placeholder="Выберите категорию" />
        </div>

        <div class="field">
          <label>Фото товара *</label>
          <FileUpload
            mode="basic"
            accept="image/*"
            :maxFileSize="2000000"
            chooseLabel="Выбрать фото"
            :auto="true"
            customUpload
            @uploader="handleImageUpload"
          />
          <ProgressSpinner v-if="uploadingImage" style="width: 30px; height: 30px" />
        </div>

        <!-- Предпросмотр фото -->
        <div v-if="form.image" class="image-preview">
          <img :src="form.image" alt="preview" />
        </div>

        <div class="field">
          <label>Описание</label>
          <Textarea v-model="form.description" rows="3" placeholder="Описание товара" />
        </div>
        <div class="field">
          <label>Старая цена (если есть скидка)</label>
          <InputNumber v-model="form.oldPrice" placeholder="0" :min="0" />
        </div>
        <div class="field-row">
          <label>В наличии</label>
          <ToggleSwitch v-model="form.inStock" />
        </div>
      </div>

      <template #footer>
        <Button label="Отмена" text @click="dialogVisible = false" />
        <Button
          :label="editingProduct ? 'Сохранить' : 'Добавить'"
          icon="pi pi-check"
          :disabled="!form.name || !form.price || !form.category || !form.image"
          @click="saveProduct"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' // 👈 computed обязательно
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useProductsStore } from '@/stores/productsStore'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import ProgressSpinner from 'primevue/progressspinner'
import { uploadImage } from '@/services/imageService'
import ToggleSwitch from 'primevue/toggleswitch'
const router = useRouter()
const productsStore = useProductsStore()

// Загружаем товары из Firebase при открытии страницы
onMounted(async () => {
  await productsStore.fetchProducts()
})

// Используем товары из стора
const products = computed(() => productsStore.products)

const categories = ['Букеты', 'Горшечные', 'Поштучно']
const dialogVisible = ref(false)
const editingProduct = ref(null)
const uploadingImage = ref(false)

const emptyForm = {
  name: '',
  price: null,
  category: '',
  image: '',
  description: '',
  oldPrice: null,
  inStock: true,
}
const form = ref({ ...emptyForm })

function openDialog(product = null) {
  editingProduct.value = product
  form.value = product ? { ...product } : { ...emptyForm }
  dialogVisible.value = true
}

// Загрузка фото через imgbb
async function handleImageUpload(event) {
  const file = event.files[0]
  uploadingImage.value = true
  try {
    form.value.image = await uploadImage(file)
  } catch (e) {
    console.error('Ошибка загрузки фото:', e)
  } finally {
    uploadingImage.value = false
  }
}

async function saveProduct() {
  const data = {
    name: form.value.name,
    price: form.value.price,
    category: form.value.category,
    image: form.value.image,
    description: form.value.description || '',
    oldPrice: form.value.oldPrice || null,
    inStock: form.value.inStock ?? true,
  }

  if (editingProduct.value) {
    await productsStore.updateProduct(editingProduct.value.id, data)
  } else {
    await productsStore.addProduct(data)
  }
  dialogVisible.value = false
}

async function deleteProduct(id) {
  await productsStore.deleteProduct(id)
}

async function handleLogout() {
  await signOut(auth)
  router.push('/')
}
</script>

<style scoped>
.admin-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.admin-header h1 {
  font-size: 1.75rem;
  font-weight: 700;
}

.header-btns {
  display: flex;
  gap: 0.75rem;
}

.add-product-btn {
  margin-bottom: 1.5rem;
}

.table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.action-btns {
  display: flex;
  gap: 0.5rem;
}

/* Диалог */
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 420px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

.field .p-inputtext,
.field .p-select,
.field .p-textarea,
.field .p-inputnumber {
  width: 100%;
}

.image-preview {
  margin-bottom: 1rem;
}

.image-preview img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
}
</style>
