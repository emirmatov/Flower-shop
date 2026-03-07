<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Лого и описание -->
      <div class="footer-brand">
        <div class="logo">
          <span class="logo-icon">✿</span>
          <span class="logo-text">Fleur</span>
        </div>
        <p class="brand-desc">Свежие цветы с доставкой. Работаем каждый день.</p>
        <a :href="`https://wa.me/${WHATSAPP}`" target="_blank" class="whatsapp-link">
          <span>💬</span> Написать в WhatsApp
        </a>
      </div>

      <!-- Навигация -->
      <div class="footer-nav">
        <h4>Меню</h4>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/catalog">Каталог</RouterLink>
        <RouterLink to="/cart">Корзина</RouterLink>
      </div>

      <!-- Категории -->
      <div class="footer-nav">
        <h4>Категории</h4>
        <RouterLink to="/catalog?category=Букеты">Букеты</RouterLink>
        <RouterLink to="/catalog?category=Горшечные">Горшечные</RouterLink>
        <RouterLink to="/catalog?category=Поштучно">Поштучно</RouterLink>
      </div>

      <!-- Контакты -->
      <div class="footer-contacts">
        <h4>Контакты</h4>
        <p>📍 Алматы</p>
        <p>🕐 Ежедневно 9:00 - 21:00</p>
        <a :href="`https://wa.me/${WHATSAPP}`" target="_blank"> 📞 +7 (777) 123-45-67 </a>
      </div>
    </div>

    <!-- Нижняя строка -->
    <div class="footer-bottom">
      <p>© {{ year }} Fleur. Все права защищены.</p>
      <RouterLink to="/admin" class="admin-link">Вход для админа</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const WHATSAPP = '77771234567' // 👈 замени на номер клиента
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--dark);
  color: #fff;
  margin-top: 4rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3.5rem 2rem 2.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 2.5rem;
}

/* Бренд */
.logo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.logo-icon {
  font-size: 1.3rem;
  color: var(--pink);
}

.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
}

.brand-desc {
  font-size: 0.875rem;
  color: #9a8a90;
  line-height: 1.6;
  margin-bottom: 1.25rem;
  max-width: 220px;
}

.whatsapp-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #25d366;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: opacity 0.2s;
}

.whatsapp-link:hover {
  opacity: 0.85;
}

/* Навигация */
.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-nav h4,
.footer-contacts h4 {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9a8a90;
  margin-bottom: 0.25rem;
}

.footer-nav a {
  text-decoration: none;
  color: #d4c4cc;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: var(--pink);
}

/* Контакты */
.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-contacts p,
.footer-contacts a {
  font-size: 0.9rem;
  color: #d4c4cc;
  text-decoration: none;
}

.footer-contacts a:hover {
  color: var(--pink);
}

/* Нижняя строка */
.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  border-top: 1px solid #2e2028;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  font-size: 0.8rem;
  color: #6a5a60;
}

.admin-link {
  font-size: 0.8rem;
  color: #4a3a40;
  text-decoration: none;
  transition: color 0.2s;
}

.admin-link:hover {
  color: #9a8a90;
}

/* Мобилка */
@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2.5rem 1.25rem 2rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .brand-desc {
    max-width: 100%;
  }

  .footer-bottom {
    padding: 1rem 1.25rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
