import "./App.css";
import { Provider } from "react-redux";
import ProductList from "./component/ProductList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { useEffect } from "react";
import ProductDetails from "./component/ProductDetails";

function App() {
  useEffect(() => {
    window.loaderCount = 0;
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductList />,
    },
    {
      path: "/productId",
      element: <ProductDetails />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
