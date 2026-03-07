import { storage } from '@/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export async function uploadImage(file) {
  // Уникальное имя файла
  const filename = `products/${Date.now()}_${file.name}`
  const storageRef = ref(storage, filename)

  // Загружаем файл
  await uploadBytes(storageRef, file)

  // Получаем ссылку
  const url = await getDownloadURL(storageRef)
  return url
}
