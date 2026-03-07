<template>
  <div class="catalog-page">
    <!-- Заголовок -->
    <div class="catalog-header">
      <h1>Каталог</h1>
      <p>{{ filteredProducts.length }} товаров</p>
    </div>

    <!-- Фильтры горизонтально -->
    <div class="filters-bar">
      <div class="category-list">
        <button
          v-for="cat in categories"
          :key="cat"
          class="category-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <Select
        v-model="sortBy"
        :options="sortOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Сортировка"
        class="sort-select"
      />
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <!-- Сетка товаров -->
    <div v-else-if="filteredProducts.length > 0" class="products-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <!-- Пусто -->
    <div v-else class="empty-state">
      <span style="font-size: 3rem">🌱</span>
      <p>Товары не найдены</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Select from 'primevue/select'
import ProgressSpinner from 'primevue/progressspinner'
import ProductCard from '@/components/catalog/ProductCard.vue'
import { useProductsStore } from '@/stores/productsStore'

const route = useRoute()
const productsStore = useProductsStore()

onMounted(async () => {
  if (productsStore.products.length === 0) {
    await productsStore.fetchProducts()
  }
})

const products = computed(() => productsStore.products)
const loading = computed(() => productsStore.loading)

const categories = ['Все', 'Букеты', 'Горшечные', 'Поштучно']
const selectedCategory = ref(route.query.category || 'Все')

const sortOptions = [
  { label: 'По умолчанию', value: 'default' },
  { label: 'Сначала дешевле', value: 'price_asc' },
  { label: 'Сначала дороже', value: 'price_desc' },
  { label: 'По названию', value: 'name' },
]
const sortBy = ref('default')

const filteredProducts = computed(() => {
  let result = [...products.value]
  if (selectedCategory.value !== 'Все') {
    result = result.filter((p) => p.category === selectedCategory.value)
  }
  if (sortBy.value === 'price_asc') result.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') result.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'name') result.sort((a, b) => a.name.localeCompare(b.name))
  return result
})
</script>

<style scoped>
.catalog-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
}

/* Заголовок */
.catalog-header {
  margin-bottom: 2rem;
}

.catalog-header h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.25rem;
}

.catalog-header p {
  color: var(--muted);
  font-size: 0.9rem;
}

/* Фильтры */
.filters-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 1.25rem;
  background: var(--white);
  border-radius: var(--radius);
  border: 1px solid var(--pink-mid);
}

.category-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  border: 1.5px solid transparent;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn:hover {
  border-color: var(--pink-mid);
  color: var(--pink);
  background: var(--pink-light);
}

.category-btn.active {
  background: var(--pink);
  color: white;
  border-color: var(--pink);
  font-weight: 600;
}

.sort-select {
  width: 180px;
  flex-shrink: 0;
}

/* Сетка */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

/* Состояния */
.loading {
  display: flex;
  justify-content: center;
  padding: 5rem;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
}

/* Мобилка */
@media (max-width: 768px) {
  .catalog-page {
    padding: 1.5rem 1rem;
  }

  .catalog-header h1 {
    font-size: 1.75rem;
  }

  .filters-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .sort-select {
    width: 100%;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 400px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}
</style>
