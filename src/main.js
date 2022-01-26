import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueClipboard from "vue3-clipboard";

const app = createApp({});

app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});

createApp(App).mount("#app");
