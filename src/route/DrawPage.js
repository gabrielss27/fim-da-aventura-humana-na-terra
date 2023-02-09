import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n"
import { nCardGroups, nCardsPerGroup } from "../provider/VoteProvider"
import { Card } from "../component/Card"
import { Globe } from "../component/Globe"
import "./DrawPage.css"

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
          const extraClass = isSelected ? " draw-card-selected" : ""
          return (
            <Card
              key={key}
              cardKey={key}
              className={"draw-card" + extraClass}
              rotation={rotation}
              faceup={revealed && isSelected}
              onClick={() => select(group, isSelected ? null : card)}
            />
          )
        })}
        <Globe id="draw-cards-globe" size="2 * var(--card-size)" duration="40s" />
      </div>
      <div
        id="draw-overlay"
        style={{
          display: revealed ? "flex" : "none",
          opacity: overlay ? 1 : 0
        }}
      >
        {selected.map((card, group) => {
          const key = `${group}-${card}`
          return (
            <div key={key} className="draw-card-revealed-container">
              <img
                className="draw-card-revealed"
                src={`/cards/${key}.png`}
                alt=""
                style={{ transform: `scale(${overlay ? 1 : 0.8})` }}
              />
              <h2 className="centered-text light-text">
                {text.cards[group][card]}
              </h2>
            </div>
          )
        })}
      </div>
      <Link
        className="back-button"
        to={-1}
        style={{ opacity: overlay ? 1 : 0.5 }}
      >
        <p className="light-text">&lt; {text.button.back}</p>
      </Link>
    </div>
  )
}
