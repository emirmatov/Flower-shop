<template>
  <div class="login-page">
    <div class="login-card">
      <h2>🌸 Админ панель</h2>
      <p class="subtitle">Вход для владельца магазина</p>

      <div class="field">
        <label>Email</label>
        <InputText v-model="form.email" placeholder="admin@flower.kz" @keyup.enter="handleLogin" />
      </div>

      <div class="field">
        <label>Пароль</label>
        <Password
          v-model="form.password"
          placeholder="Введите пароль"
          :feedback="false"
          toggleMask
          @keyup.enter="handleLogin"
        />
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <Button
        label="Войти"
        icon="pi pi-sign-in"
        class="login-btn"
        :loading="loading"
        @click="handleLogin"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const router = useRouter()
const form = ref({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, form.value.email, form.value.password)
    router.push('/admin/products')
  } catch (e) {
    error.value = 'Неверный email или пароль'
  } finally {
    loading.value = false
  }
}
</script>
