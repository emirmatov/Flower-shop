<template>
  <div class="product-card" @click="router.push(`/product/${product.id}`)">
    <div class="card-image">
      <img :src="product.image" :alt="product.name" />
      <span class="card-category">{{ product.category }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-name">{{ product.name }}</h3>
      <div class="card-footer">
        <span class="card-price">{{ product.price.toLocaleString() }} ₸</span>
        <button class="card-btn" @click.stop="handleAddToCart">+ В корзину</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  product: { type: Object, required: true },
})

const router = useRouter()
const cart = useCartStore()
const toast = useToast()

function handleAddToCart() {
  cart.addToCart(props.product)
  toast.add({
    severity: 'success',
    summary: 'Добавлено!',
    detail: props.product.name,
    life: 2000,
  })
}
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  border: 1px solid transparent;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--pink-mid);
}

.card-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--pink-light);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .card-image img {
  transform: scale(1.08);
}

.card-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--pink);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card-body {
  padding: 1rem 1.1rem 1.1rem;
}

.card-name {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--pink);
}

.card-btn {
  background: var(--pink-light);
  color: var(--pink);
  border: none;
  padding: 0.45rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
}

.card-btn:hover {
  background: var(--pink);
  color: white;
}
</style>
