<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <!-- Пустая корзина -->
    <div v-if="cart.items.length === 0" class="empty-cart">
      <i class="pi pi-shopping-cart" style="font-size: 4rem; color: #ddd" />
      <p>Ваша корзина пуста</p>
      <Button label="Перейти в каталог" icon="pi pi-arrow-right" @click="router.push('/catalog')" />
    </div>

    <!-- Товары в корзине -->
    <div v-else class="cart-layout">
      <!-- Список товаров -->
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.product.id" class="cart-item">
          <!-- Фото -->
          <img :src="item.product.image" :alt="item.product.name" class="item-image" />

          <!-- Инфо -->
          <div class="item-info">
            <p class="item-name">{{ item.product.name }}</p>
            <p class="item-price">{{ item.product.price }} ₸ / шт.</p>
          </div>

          <!-- Количество -->
          <div class="item-quantity">
            <Button
              icon="pi pi-minus"
              rounded
              outlined
              size="small"
              @click="cart.decreaseQuantity(item.product.id)"
            />
            <span>{{ item.quantity }}</span>
            <Button
              icon="pi pi-plus"
              rounded
              outlined
              size="small"
              @click="cart.increaseQuantity(item.product.id)"
            />
          </div>

          <!-- Сумма за позицию -->
          <p class="item-total">{{ item.product.price * item.quantity }} ₸</p>

          <!-- Удалить -->
          <Button
            icon="pi pi-trash"
            rounded
            text
            severity="danger"
            @click="cart.removeFromCart(item.product.id)"
          />
        </div>
      </div>

      <!-- Итого -->
      <div class="cart-summary">
        <h3>Итого</h3>

        <div class="summary-row">
          <span>Товаров:</span>
          <span>{{ cart.totalCount }} шт.</span>
        </div>
        <div class="summary-row">
          <span>Сумма:</span>
          <span>{{ cart.totalPrice }} ₸</span>
        </div>

        <Divider />

        <div class="summary-row total">
          <span>К оплате:</span>
          <span>{{ cart.totalPrice }} ₸</span>
        </div>

        <Button
          label="Оформить заказ"
          icon="pi pi-check"
          size="large"
          class="checkout-btn"
          @click="router.push('/checkout')"
        />

        <Button
          label="Продолжить покупки"
          icon="pi pi-arrow-left"
          text
          class="continue-btn"
          @click="router.push('/catalog')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const cart = useCartStore()
</script>

<style scoped>
.cart-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #aaa;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

/* Список товаров */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: 600;
  margin: 0 0 0.25rem;
}

.item-price {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  min-width: 80px;
  justify-content: center;
}

.item-total {
  font-weight: 700;
  color: #e91e8c;
  min-width: 100px;
  text-align: right;
  margin: 0;
}

/* Итого */
.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 80px;
}

.cart-summary h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: #555;
}

.summary-row.total {
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
}

.checkout-btn {
  width: 100%;
  margin-bottom: 0.75rem;
}

.continue-btn {
  width: 100%;
}

@media (max-width: 768px) {
  .cart-page {
    padding: 1.5rem 1rem;
  }

  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .item-total {
    display: none;
  }
}
</style>
