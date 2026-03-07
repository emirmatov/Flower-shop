<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">✿</span>
        <span class="logo-text">Fleur</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/catalog">Каталог</RouterLink>
      </nav>

      <RouterLink to="/cart" class="cart-btn">
        <span class="cart-icon">🛒</span>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
const cart = useCartStore()
const cartCount = computed(() => cart.totalCount)
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(253, 250, 247, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--pink-mid);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.4rem;
  color: var(--pink);
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--dark);
  letter-spacing: -0.02em;
}

.nav {
  display: flex;
  gap: 2rem;
  flex: 1;
}

.nav a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--muted);
  transition: color 0.2s;
  letter-spacing: 0.02em;
}

.nav a:hover,
.nav a.router-link-active {
  color: var(--pink);
}

.cart-btn {
  margin-left: auto;
  position: relative;
  text-decoration: none;
  font-size: 1.3rem;
  transition: transform 0.2s;
  display: block;
}

.cart-btn:hover {
  transform: scale(1.1);
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--pink);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Sans', sans-serif;
}
@media (max-width: 768px) {
  .header-inner {
    padding: 0 1rem;
    gap: 1rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }

  .nav {
    gap: 1rem;
  }

  .nav a {
    font-size: 0.85rem;
  }
}
</style>
