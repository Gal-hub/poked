import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "@mantine/core/styles.css";

import { AuthenticationForm } from "./components/auth";
import { MantineProvider } from "@mantine/core";
import { Poked } from "./components/poked";
import { ConfigurationPage } from "./components/ConfigurationPage";
import { NavbarMinimal } from "./components/navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationForm />,
  },
  {
    path: "poked",
    element: <Poked />,
  },
  {
    path: "confg",
    element: <ConfigurationPage />,
  },
  {
    path: "nav",
    element: <NavbarMinimal />,
  },
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
