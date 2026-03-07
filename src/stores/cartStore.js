import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([]) // [{ product, quantity }]

  // Сколько всего товаров в корзине
  const totalCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  // Сколько всего стоит
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  function addToCart(product) {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId) {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function clearCart() {
    items.value = []
  }
  function increaseQuantity(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) item.quantity++
  }

  function decreaseQuantity(productId) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        // Если количество 1 — удаляем товар
        removeFromCart(productId)
      }
    }
  }

  // Не забудь добавить их в return!
  return {
    items,
    totalCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity, // 👈
  }
})
