import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as diretives from "vuetify/directives";
import './registerServiceWorker'

const vuetify = createVuetify({
  components,
  diretives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: { mdi },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount("#app");
