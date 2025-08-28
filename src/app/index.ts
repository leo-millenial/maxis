import { createApp } from 'vue'
import App from './App.vue'
import { router, pinia } from './providers'

const app = createApp(App)

app.use(pinia)
app.use(router)

export { app }
