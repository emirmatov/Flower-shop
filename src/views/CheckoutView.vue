<template>
  <div class="checkout-page">
    <h1>Оформление заказа</h1>

    <div class="checkout-layout">
      <!-- Форма с контактами -->
      <div class="checkout-form">
        <h3>Ваши данные</h3>

        <div class="field">
          <label>Имя *</label>
          <InputText v-model="form.name" placeholder="Ваше имя" />
        </div>

        <div class="field">
          <label>Телефон *</label>
          <InputText v-model="form.phone" placeholder="+7 (777) 123-45-67" />
        </div>

        <div class="field">
          <label>Адрес доставки</label>
          <Textarea
            v-model="form.address"
            placeholder="Или оставьте пустым если самовывоз"
            rows="3"
          />
        </div>

        <div class="field">
          <label>Комментарий к заказу</label>
          <Textarea
            v-model="form.comment"
            placeholder="Пожелания, время доставки и т.д."
            rows="3"
          />
        </div>

        <!-- Кнопка WhatsApp -->
        <Button
          label="Отправить заказ в WhatsApp"
          icon="pi pi-whatsapp"
          class="whatsapp-btn"
          :disabled="!form.name || !form.phone"
          @click="sendToWhatsApp"
        />

        <p class="hint">* Нажав кнопку, откроется WhatsApp с готовым сообщением</p>
      </div>

      <!-- Список товаров -->
      <div class="order-summary">
        <h3>Ваш заказ</h3>

        <div v-for="item in cart.items" :key="item.product.id" class="order-item">
          <span>{{ item.product.name }} × {{ item.quantity }}</span>
          <span>{{ item.product.price * item.quantity }} ₸</span>
        </div>

        <Divider />

        <div class="order-total">
          <span>Итого:</span>
          <strong>{{ cart.totalPrice }} ₸</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useCartStore } from '@/stores/cartStore'
import { useHead } from '@unhead/vue'

useHead({
  title: 'Оформление заказа — Fleur',
})
const router = useRouter()
const cart = useCartStore()

const WHATSAPP_NUMBER = '77751353662'

const form = ref({
  name: '',
  phone: '',
  address: '',
  comment: '',
})

function sendToWhatsApp() {
  // Формируем список товаров
  const itemsList = cart.items
    .map((i) => `• ${i.product.name} × ${i.quantity} = ${i.product.price * i.quantity} ₸`)
    .join('\n')

  // Собираем всё сообщение
  const message = `
🌸 *Новый заказ*

👤 Имя: ${form.value.name}
📞 Телефон: ${form.value.phone}
${form.value.address ? `📍 Адрес: ${form.value.address}` : '📍 Самовывоз'}
${form.value.comment ? `💬 Комментарий: ${form.value.comment}` : ''}

🛒 *Состав заказа:*
${itemsList}

💰 *Итого: ${cart.totalPrice} ₸*
  `.trim()

  // Открываем WhatsApp
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')

  // Очищаем корзину
  cart.clearCart()

  // Возвращаем на главную
  router.push('/')
}
</script>

<style scoped>
.checkout-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 2rem;
  align-items: start;
}

.checkout-form {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.checkout-form h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
}

.field .p-inputtext,
.field .p-textarea {
  width: 100%;
}

.whatsapp-btn {
  width: 100%;
  background: #25d366 !important;
  border-color: #25d366 !important;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.whatsapp-btn:hover {
  background: #1ebe5d !important;
}

.hint {
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 0.75rem;
}

/* Итого */
.order-summary {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 80px;
}

.order-summary h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.6rem;
}

.order-total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 1.5rem 1rem;
  }

  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }

  .dialog-form {
    width: 100%;
  }
}
</style>
``` --- ## Что получается в WhatsApp Клиент нажимает кнопку и у него открывается WhatsApp с готовым
сообщением: ``` 🌸 Новый заказ 👤 Имя: Айгерим 📞 Телефон: +7 777 123 45 67 📍 Адрес: ул. Абая 10,
кв. 5 💬 Комментарий: доставить до 18:00 🛒 Состав заказа: - Букет из роз × 1 = 15000 ₸ - Тюльпан
поштучно × 5 = 4000 ₸ 💰 Итого: 19000 ₸
