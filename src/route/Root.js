import { Outlet } from "react-router-dom"
import "./Root.css"

export const Root = () => {
  return (
    <div id="app-root">
      <Outlet />
    </div>
  )
}
