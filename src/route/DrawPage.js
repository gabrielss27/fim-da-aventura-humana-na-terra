import React, { Fragment, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n"
import "./DrawPage.css"

const nCardGroups = 3
const nCardsPerGroup = 7

const cards = Array(nCardGroups)
  .fill()
  .map(() =>
    Array(nCardsPerGroup)
      .fill()
      .map((_, i) => i)
  )

const shuffle = array => {
  const shuffled = array.map(v => v)
  for (let i = 0; i < shuffled.length; i++) {
    const j = i + Math.floor(Math.random() * (shuffled.length - i))
    ;[shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]]
  }
  return shuffled
}

export const DrawPage = () => {
  const [shuffledCards, setShuffledCards] = useState([])
  const [selected, setSelected] = useState([])
  const [revealed, setRevealed] = useState(false)
  const [overlay, setOverlayOpacity] = useState(false)
  const text = useLocale()[1]

  useEffect(() => {
    setShuffledCards(
      cards.map(cs => shuffle(cs)).flatMap((cs, i) => cs.map(c => [i, c]))
    )
  }, [])

  const select = (group, card) => {
    if (revealed) return
    const newSelected = selected.map(v => v)
    newSelected[group] = card
    setSelected(newSelected)
    const selectedCount = newSelected
      .map(v => (v != null ? 1 : 0))
      .reduce((a, b) => a + b, 0)
    if (selectedCount === 3) {
      setRevealed(true)
      setTimeout(() => setOverlayOpacity(true), 10)
    }
  }

  return (
    <div className="page centered-page draw-page">
      <h1 className="centered-text light-text">{text.title.draw}</h1>
      <p className="centered-text light-text">{text.about.draw}</p>
      <div id="draw-cards-container">
        {shuffledCards.map(([group, card], i) => {
          const key = `${group}-${card}`
          const rotation = (i / shuffledCards.length) * (Math.PI * 2)
          const isSelected = selected[group] === card
          return (
            <Fragment key={key}>
              <img
                className={`draw-card${
                  isSelected ? " draw-card-selected" : ""
                }`}
                src={`/cards/${group}-back.png`}
                alt=""
                style={{
                  "--rotation": `${rotation}rad`,
                  "--y-rotation": revealed && isSelected ? "180deg" : "0deg"
                }}
                onClick={() => select(group, isSelected ? null : card)}
              />
              <img
                className={`draw-card${
                  isSelected ? " draw-card-selected" : ""
                }`}
                src={`/cards/${key}.png`}
                alt=""
                style={{
                  "--rotation": `${rotation}rad`,
                  "--y-rotation": revealed && isSelected ? "0deg" : "180deg"
                }}
                onClick={() => select(group, isSelected ? null : card)}
              />
            </Fragment>
          )
        })}
        <div id="draw-cards-globe" />
      </div>
      <div
        id="draw-overlay"
        style={{ display: revealed ? "flex" : "none", opacity: overlay ? 1 : 0 }}
      >
        {selected.map((card, group) => {
          const key = `${group}-${card}`
          return (
            <div key={key} className="draw-card-revealed-container">
              <img
                className="draw-card-revealed"
                src={`/cards/${key}.png`}
                alt=""
                style={{transform: `scale(${overlay ? 1 : 0.8})`}}
              />
              <h2 className="centered-text light-text">
                {text.cards[group][card]}
              </h2>
            </div>
          )
        })}
      </div>
      <Link className="back-button" to={-1} style={{opacity: overlay ? 1 : 0.5}}>
        <p className="light-text">&lt; {text.button.back}</p>
      </Link>
    </div>
  )
}
