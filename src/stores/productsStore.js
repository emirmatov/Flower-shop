import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const loading = ref(false)

  // Загрузить все товары из Firestore
  async function fetchProducts() {
    loading.value = true
    try {
      const snapshot = await getDocs(collection(db, 'products'))
      products.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (e) {
      console.error('Ошибка загрузки товаров:', e)
    } finally {
      loading.value = false
    }
  }

  // Добавить товар
  async function addProduct(product) {
    try {
      const docRef = await addDoc(collection(db, 'products'), product)
      products.value.push({ id: docRef.id, ...product })
    } catch (e) {
      console.error('Ошибка добавления товара:', e)
    }
  }

  // Обновить товар
  async function updateProduct(id, updated) {
    try {
      await updateDoc(doc(db, 'products', id), updated)
      const index = products.value.findIndex((p) => p.id === id)
      products.value[index] = { id, ...updated }
    } catch (e) {
      console.error('Ошибка обновления товара:', e)
    }
  }

  // Удалить товар
  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id))
      products.value = products.value.filter((p) => p.id !== id)
    } catch (e) {
      console.error('Ошибка удаления товара:', e)
    }
  }

  return { products, loading, fetchProducts, addProduct, updateProduct, deleteProduct }
})
