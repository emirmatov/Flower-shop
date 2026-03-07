<template>
  <section class="product-page">
    <div v-if="loading" class="state-block">Загрузка...</div>

    <div v-else-if="!product" class="state-block">Товар не найден</div>

    <div v-else class="product-layout">
      <button class="back-btn" @click="router.push('/catalog')">← Назад в каталог</button>

      <div class="product-content">
        <div class="product-image">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="product-info">
          <span class="product-category">{{ product.category }}</span>

          <h1 class="product-title">{{ product.name }}</h1>

          <div class="product-price">{{ Number(product.price || 0).toLocaleString() }} ₸</div>

          <p class="product-description">
            {{ product.description || 'Описание отсутствует' }}
          </p>

          <div v-if="product.inStock === false" class="out-text">Нет в наличии</div>

          <template v-else>
            <div class="quantity-row">
              <button class="qty-btn" @click="decreaseQty">−</button>
              <span class="qty-value">{{ quantity }}</span>
              <button class="qty-btn" @click="increaseQty">+</button>
            </div>

            <div class="total-price">Итого: {{ totalPrice.toLocaleString() }} ₸</div>
          </template>

          <button class="add-btn" :disabled="product.inStock === false" @click="handleAddToCart">
            {{ product.inStock === false ? 'Нет в наличии' : 'Добавить в корзину' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { useToast } from 'primevue/usetoast'
import { db } from '@/firebase'
import { useCartStore } from '@/stores/cartStore'
import { useHead } from '@unhead/vue'

useHead(
  computed(() => ({
    title: product.value ? `${product.value.name} — Fleur` : 'Товар — Fleur',
    meta: [
      {
        name: 'description',
        content: product.value?.description
          ? `${product.value.description} Купить в Алматы.`
          : 'Купить цветы с доставкой в Алматы.',
      },
      {
        property: 'og:title',
        content: product.value?.name ?? 'Fleur',
      },
      {
        property: 'og:image',
        content: product.value?.image ?? '',
      },
    ],
  })),
)
const route = useRoute()
const router = useRouter()
const toast = useToast()
const cart = useCartStore()

const loading = ref(true)
const product = ref(null)
const quantity = ref(1)

const totalPrice = computed(() => {
  return Number(product.value?.price || 0) * quantity.value
})

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

function handleAddToCart() {
  if (!product.value || product.value.inStock === false) return

  cart.addToCart({
    ...product.value,
    quantity: quantity.value,
  })

  toast.add({
    severity: 'success',
    summary: 'Добавлено!',
    detail: `${product.value.name} x${quantity.value}`,
    life: 2000,
  })
}

onMounted(async () => {
  loading.value = true

  try {
    const id = route.params.id

    if (!id) {
      product.value = null
      return
    }

    const snap = await getDoc(doc(db, 'products', id))

    if (snap.exists()) {
      const data = snap.data()

      product.value = {
        id: snap.id,
        name: data.name || '',
        image: data.image || '',
        price: data.price || 0,
        oldPrice: data.oldPrice || null,
        description: data.description || '',
        category: data.category || '',
        inStock: data.inStock !== false,
      }
    } else {
      product.value = null
    }
  } catch (error) {
    console.error('Ошибка загрузки товара:', error)
    product.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem 4rem;
}

.state-block {
  padding: 4rem 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: var(--muted);
}

.back-btn {
  margin-bottom: 1.5rem;
  background: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--muted);
  font-family: 'DM Sans', sans-serif;
  transition: color 0.2s;
  padding: 0;
}

.back-btn:hover {
  color: var(--pink);
}

.product-layout {
  display: flex;
  flex-direction: column;
}

.product-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.product-image {
  background: var(--pink-light);
  border-radius: 24px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.product-category {
  display: inline-block;
  margin-bottom: 0.8rem;
  color: var(--pink);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
}

.product-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
  color: var(--dark);
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.product-price {
  font-size: 2rem;
  font-weight: 700;
  color: var(--pink);
  margin-bottom: 1rem;
}

.product-description {
  color: var(--muted);
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.quantity-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.qty-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--pink-mid);
  background: transparent;
  cursor: pointer;
  font-size: 1.3rem;
  color: var(--pink);
  transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
}

.qty-btn:hover {
  background: var(--pink);
  color: white;
  border-color: var(--pink);
}

.qty-value {
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.total-price {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--dark);
}

.out-text {
  margin-bottom: 1rem;
  color: #c0392b;
  font-weight: 600;
}

.add-btn {
  width: 100%;
  border: none;
  background: var(--pink);
  color: white;
  padding: 1rem 1.2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(232, 84, 122, 0.35);
}

.add-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(232, 84, 122, 0.45);
}

.add-btn:disabled {
  background: #ddd;
  color: #888;
  cursor: not-allowed;
  box-shadow: none;
}

@media (max-width: 900px) {
  .product-page {
    padding: 1.5rem 1rem 3rem;
  }

  .product-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-title {
    font-size: 1.75rem;
  }

  .product-price {
    font-size: 1.5rem;
  }
}
</style>
