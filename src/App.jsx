import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTES from "./routes"
import AuthProvider from "./Services/Context/AuthContext"
const router = createBrowserRouter(ROUTES)
function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
