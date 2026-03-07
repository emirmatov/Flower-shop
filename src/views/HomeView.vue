<template>
  <div class="home">
    <!-- Герой секция -->
    <section class="hero">
      <div class="hero-content">
        <h1>Свежие цветы<br />с доставкой 🌸</h1>
        <p>Букеты, комнатные растения и поштучно.<br />Доставим в день заказа!</p>
        <Button
          label="Перейти в каталог"
          icon="pi pi-arrow-right"
          iconPos="right"
          size="large"
          class="hero-btn"
          @click="router.push('/catalog')"
        />
      </div>
      <div class="hero-image">🌺</div>
    </section>

    <!-- Категории -->
    <section class="categories">
      <h2>Категории</h2>
      <div class="categories-grid">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="category-card"
          @click="goToCategory(cat.name)"
        >
          <span class="cat-emoji">{{ cat.emoji }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <!-- Популярные товары -->
    <section class="popular">
      <h2>Популярные товары</h2>

      <div v-if="productsStore.loading" class="loading">
        <ProgressSpinner />
      </div>

      <div v-else-if="popularProducts.length > 0" class="popular-grid">
        <ProductCard v-for="product in popularProducts" :key="product.id" :product="product" />
      </div>

      <div v-else class="empty">
        <p>Товары скоро появятся 🌱</p>
      </div>

      <div class="see-all">
        <Button
          label="Смотреть все"
          icon="pi pi-arrow-right"
          iconPos="right"
          outlined
          @click="router.push('/catalog')"
        />
      </div>
    </section>

    <!-- Почему мы -->
    <section class="features">
      <h2>Почему выбирают нас</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="f in features" :key="f.title">
          <span class="feature-icon">{{ f.icon }}</span>
          <h3>{{ f.title }}</h3>
          <p>{{ f.text }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <h2>Готовы сделать заказ?</h2>
      <p>Выберите цветы и оформите заказ через WhatsApp за 2 минуты</p>
      <Button
        label="Выбрать цветы"
        icon="pi pi-heart"
        size="large"
        class="cta-btn"
        @click="router.push('/catalog')"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import ProductCard from '@/components/catalog/ProductCard.vue'
import { useProductsStore } from '@/stores/productsStore'

const router = useRouter()
const productsStore = useProductsStore()

// Загружаем товары если ещё не загружены
onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})

// Показываем первые 4 товара на главной
const popularProducts = computed(() => productsStore.products.slice(0, 4))

const categories = [
  { name: 'Букеты', emoji: '💐' },
  { name: 'Горшечные', emoji: '🌿' },
  { name: 'Поштучно', emoji: '🌹' },
]

const features = [
  {
    icon: '🚚',
    title: 'Быстрая доставка',
    text: 'Доставляем цветы в день заказа по всему городу',
  },
  {
    icon: '🌸',
    title: 'Свежие цветы',
    text: 'Только свежие цветы, закупаем каждый день',
  },
  {
    icon: '💬',
    title: 'Удобный заказ',
    text: 'Оформление заказа через WhatsApp за 2 минуты',
  },
  {
    icon: '🎁',
    title: 'Красивая упаковка',
    text: 'Каждый букет упакуем красиво и аккуратно',
  },
]

function goToCategory(name) {
  router.push({ path: '/catalog', query: { category: name } })
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Герой */
.hero {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2rem;
  padding: 5rem 4rem;
  background:
    radial-gradient(ellipse at 80% 50%, #f9d0db 0%, transparent 60%),
    radial-gradient(ellipse at 20% 80%, #fde8f0 0%, transparent 50%), var(--pink-light);
  border-radius: 28px;
  margin: 2rem 0 4rem;
  overflow: hidden;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e8547a' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero-content {
  position: relative;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  color: var(--dark);
  letter-spacing: -0.02em;
}

.hero-content p {
  font-size: 1.05rem;
  color: var(--muted);
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 420px;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--pink) !important;
  border-color: var(--pink) !important;
  padding: 0.85rem 2rem !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  box-shadow: 0 8px 24px rgba(232, 84, 122, 0.35) !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s !important;
}

.hero-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 32px rgba(232, 84, 122, 0.45) !important;
}

.hero-image {
  font-size: 11rem;
  line-height: 1;
  position: relative;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

/* Категории */
.categories,
.popular,
.features {
  padding: 4rem 0;
}

.categories h2,
.popular h2,
.features h2,
.cta h2 {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem 2rem;
  background: var(--white);
  border-radius: var(--radius);
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: all 0.3s;
}

.category-card:hover {
  border-color: var(--pink-mid);
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.cat-emoji {
  font-size: 3.5rem;
}

.cat-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dark);
}

/* Популярные */
.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: var(--muted);
}

.see-all {
  text-align: center;
  margin-top: 2.5rem;
}

/* Почему мы */
.features {
  background: var(--white);
  border-radius: 28px;
  padding: 4rem 3rem;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 1rem;
}

.feature-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.875rem;
  color: var(--muted);
  line-height: 1.6;
}

/* CTA */
.cta {
  text-align: center;
  padding: 5rem 2rem;
  background: radial-gradient(ellipse at center, #f9d0db 0%, var(--pink-light) 70%);
  border-radius: 28px;
  margin-bottom: 4rem;
}

.cta p {
  color: var(--muted);
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

.cta-btn {
  background: var(--pink) !important;
  border-color: var(--pink) !important;
  padding: 0.85rem 2.5rem !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  box-shadow: 0 8px 24px rgba(232, 84, 122, 0.35) !important;
}

@media (max-width: 768px) {
  .home {
    padding: 0 1rem;
  }

  .hero {
    grid-template-columns: 1fr;
    padding: 2.5rem 1.5rem;
    text-align: center;
    margin: 1rem 0 2rem;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }

  .hero-content p {
    font-size: 0.95rem;
  }

  .hero-image {
    font-size: 6rem;
    order: -1;
  }

  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .category-card {
    padding: 1.25rem 0.75rem;
  }

  .cat-emoji {
    font-size: 2.5rem;
  }

  .cat-name {
    font-size: 0.85rem;
  }

  .popular-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .cta {
    padding: 3rem 1.5rem;
  }

  .cta h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }

  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .popular-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .features-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
