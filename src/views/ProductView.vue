<template>
  <div
    class="product-card"
    :class="{ 'out-of-stock': !product.inStock }"
    @click="router.push(`/product/${product.id}`)"
  >
    <div class="card-image">
      <img :src="product.image" :alt="product.name" />

      <!-- Бейдж скидки -->
      <span v-if="product.oldPrice && product.inStock" class="badge-sale">
        -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
      </span>

      <!-- Бейдж нет в наличии -->
      <span v-if="!product.inStock" class="badge-out"> Нет в наличии </span>

      <span class="card-category">{{ product.category }}</span>
    </div>

    <div class="card-body">
      <h3 class="card-name">{{ product.name }}</h3>
      <div class="card-footer">
        <div class="prices">
          <span class="card-price">{{ product.price.toLocaleString() }} ₸</span>
          <span v-if="product.oldPrice" class="old-price">
            {{ product.oldPrice.toLocaleString() }} ₸
          </span>
        </div>
        <button
          class="card-btn"
          :class="{ disabled: !product.inStock }"
          :disabled="!product.inStock"
          @click.stop="handleAddToCart"
        >
          {{ product.inStock ? '+ В корзину' : 'Нет' }}
        </button>
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
  if (!props.product.inStock) return
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

.product-card.out-of-stock {
  opacity: 0.7;
}

.product-card.out-of-stock:hover {
  transform: none;
  box-shadow: none;
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

/* Бейдж скидки */
.badge-sale {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--pink);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

/* Бейдж нет в наличии */
.badge-out {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
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

.prices {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.card-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--pink);
}

.old-price {
  font-size: 0.8rem;
  color: var(--muted);
  text-decoration: line-through;
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

.card-btn:hover:not(.disabled) {
  background: var(--pink);
  color: white;
}

.card-btn.disabled {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
}
</style>
