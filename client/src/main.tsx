import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/index.tsx";
import FillFormPage from "./pages/FillFormPage/index.tsx";
import ResponsesPage from "./pages/ResponsesPage/index.tsx";
import FormBuilderPage from "./pages/FormBuilder/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="forms">
              <Route index element={<HomePage />} />
              <Route path="new" element={<FormBuilderPage />} />
              <Route path=":id/fill" element={<FillFormPage />} />
              <Route path=":id/responses" element={<ResponsesPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>
);
