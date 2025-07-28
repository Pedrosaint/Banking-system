import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './config/route'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";


if (window.location.pathname === '/') {
  window.location.href = '/landing.html'; // Redirect to your HTML page
} else {
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
      <Toaster richColors position="top-right" />
    </Provider>
  </StrictMode>
);
}