import { Link } from "react-router-dom"
import { useLocale } from "../i18n"
import "./HomePage.css"

const sides = ["draw", "choose"]

export const HomePage = () => {
  const [lang, text] = useLocale()

  const openDarkDisc = (disc, direction) => {
    const offset = `calc(${direction} * var(--disc-offset))`
    disc.style.left = offset
  }

  const onClickDarkDisc = e => {
    const rect = e.target.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    if (x < 0.2) openDarkDisc(e.target, 1)
    else if (x > 0.8) openDarkDisc(e.target, -1)
    else openDarkDisc(e.target, 0)
  }

  return (
    <div className="page centered-page">
      <div id="disc-container">
        <div id="disc-light" className="disc">
          {sides.map(side => (
            <div key={side} className="side-container">
              <Link to={`/${side}?lang=${lang}`}>
                <h2 className="centered-text dark-text small-text">
                  {text.button[side]}
                </h2>
              </Link>
            </div>
          ))}
        </div>
        <div id="disc-dark" className="disc" onClick={onClickDarkDisc}>
          <div className="text-container">
            <h1 className="centered-text light-text small-text">{text.title.home}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
