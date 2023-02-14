import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Root } from "./route/Root"
import { ErrorPage } from "./ErrorPage"
import { DrawPage } from "./route/DrawPage"
import { ChoosePage } from "./route/ChoosePage"
import { HomePage } from "./route/HomePage"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
// import reportWebVitals from "./reportWebVitals"

const router = createMemoryRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "draw", element: <DrawPage /> },
      { path: "choose", element: <ChoosePage /> }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// reportWebVitals()
