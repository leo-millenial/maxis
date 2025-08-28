import { createPinia } from 'pinia'

import router from './router'
import { app } from './app'

app.use(createPinia())
app.use(router)

app.mount('#app')
