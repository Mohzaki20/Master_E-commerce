import { createRoot } from "react-dom/client";
import AppRouter from "@routes/AppRouter";
//redux
import { Provider } from "react-redux";
import { presistor, store } from "@store/index";
//axios
import "./services/axios-global.js"
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={presistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
