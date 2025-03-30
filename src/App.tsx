
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import { Toaster } from "./components/ui/toaster";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
