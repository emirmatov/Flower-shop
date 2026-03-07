<template>
  <div class="product-page">
    <!-- Кнопка назад -->
    <Button
      label="Назад в каталог"
      icon="pi pi-arrow-left"
      text
      @click="router.push('/catalog')"
      class="back-btn"
    />

    <!-- Загрузка -->
    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <!-- Товар не найден -->
    <div v-else-if="!product" class="not-found">
      <p>Товар не найден 😢</p>
      <Button label="Вернуться в каталог" @click="router.push('/catalog')" />
    </div>

    <!-- Сам товар -->
    <div v-else class="product-layout">
      <!-- Фото -->
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <!-- Инфо -->
      <div class="product-details">
        <span class="product-category">{{ product.category }}</span>
        <h1 class="product-name">{{ product.name }}</h1>
        <p class="product-price">{{ product.price }} ₸</p>
        <p class="product-description">{{ product.description }}</p>

        <!-- Количество -->
        <div class="quantity-row">
          <Button
            icon="pi pi-minus"
            rounded
            outlined
            @click="decreaseQty"
            :disabled="quantity <= 1"
          />
          <span class="quantity">{{ quantity }}</span>
          <Button icon="pi pi-plus" rounded outlined @click="quantity++" />
        </div>

        <!-- Итого -->
        <p class="total-price">
          Итого: <strong>{{ product.price * quantity }} ₸</strong>
        </p>

        <!-- Кнопка в корзину -->
        <Button
          label="Добавить в корзину"
          icon="pi pi-shopping-cart"
          size="large"
          class="add-btn"
          @click="handleAddToCart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import { useCartStore } from '@/stores/cartStore'
import { useProductsStore } from '@/stores/productsStore'
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const productsStore = useProductsStore()
const toast = useToast()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)

onMounted(async () => {
  // Если товары ещё не загружены — загружаем
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }

  // Ищем товар по id из URL
  const id = route.params.id
  product.value = productsStore.products.find((p) => p.id === id) || null
  loading.value = false
})

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

function handleAddToCart() {
  for (let i = 0; i < quantity.value; i++) {
    cart.addToCart(product.value)
  }
  toast.add({
    severity: 'success',
    summary: 'Добавлено!',
    detail: `${product.value.name} (${quantity.value} шт.)`,
    life: 2000,
  })
}
</script>

<style scoped>
.product-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.back-btn {
  margin-bottom: 1.5rem;
  color: #888;
}

.loading,
.not-found {
  text-align: center;
  padding: 4rem;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.product-image img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

.product-category {
  font-size: 0.85rem;
  color: #e91e8c;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-name {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e91e8c;
  margin: 0.5rem 0;
}

.product-description {
  color: #555;
  line-height: 1.6;
  margin: 1rem 0;
}

.quantity-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 0.5rem;
}

.quantity {
  font-size: 1.2rem;
  font-weight: 700;
  min-width: 2rem;
  text-align: center;
}

.total-price {
  color: #555;
  margin-bottom: 1.5rem;
}

.add-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .product-page {
    padding: 1rem;
  }

  .product-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-content h1 {
    font-size: 1.4rem;
  }
}
</style>
