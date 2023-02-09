import { useRouteError } from "react-router-dom"
import { useLocale } from "./i18n"

export const ErrorPage = () => {
  const error = useRouteError()
  const text = useLocale()[1]
  console.error(error)

  return (
    <div
      id="error-page"
      className="page centered-page"
      style={{ backgroundColor: "var(--background)", padding: "10rem" }}
    >
      <h1 className="light-text centered-text" style={{ marginBottom: "1rem" }}>
        {text.title.error}
      </h1>
      <p className="light-text centered-text" style={{ marginBottom: "1rem" }}>
      {text.about.error}
      </p>
      <code className="light-text centered-text">
        {error.statusText || error.message}
      </code>
    </div>
  )
}
