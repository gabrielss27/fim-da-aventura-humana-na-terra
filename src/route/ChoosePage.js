import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useLocale } from "../i18n"
import {
  VoteProvider,
  nCardGroups,
  nCardsPerGroup
} from "../provider/VoteProvider"
import { Card } from "../component/Card"
import "./ChoosePage.css"

const cardsKeys = Array(nCardGroups)
  .fill()
  .flatMap((_, group) =>
    Array(nCardsPerGroup)
      .fill()
      .map((_, card) => `${group}-${card}`)
  )

const voteProvider = new VoteProvider()

export const ChoosePage = () => {
  const text = useLocale()[1]
  const [votes, setVotes] = useState({})
  const [votedFor, setVotedFor] = useState(null)
  const [voted, setVoted] = useState(false)
  const [faceup, setFaceup] = useState(true)
  const [keyOrder, setKeyOrder] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const order = {}
    cardsKeys
      .map(key => [votes[key], key])
      .sort((a, b) => b[0] - a[0])
      .map(([_, k]) => k)
      .forEach((key, i) => {
        order[key] = i
      })
    setKeyOrder(order)
  }, [votes])

  const vote = key => {
    if (votedFor != null) return
    setFaceup(false)
    setHovered(null)
    setVotedFor(key)
    voteProvider
      .vote(votedFor)
      .then(vt => {
        setVotes(vt)
        setVoted(true)
        setTimeout(() => setFaceup(true), 2500)
      })
      .catch(e => {
        setVotedFor(null)
        setFaceup(true)
      })
  }

  const touchCard = (e, key) => {
    if (hovered === key && votedFor === null) vote(key)
    else setHovered(key)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      className="page centered-page choose-page"
      onClick={() => setHovered(null)}
    >
      <h1 className="centered-text light-text">{text.title.choose}</h1>
      <p className="centered-text light-text">{text.about.choose}</p>
      <div className="choose-content">
        <div className="choose-globe-container">
          <div className="choose-globe choose-globe-left" />
        </div>
        <div className="choose-cards-container">
          <div className="choose-cards-subcontainer">
            {cardsKeys.map((key, index) => {
              const order = keyOrder == null || !voted ? index : keyOrder[key]
              const i = Math.floor(order / nCardsPerGroup)
              const j = order % nCardsPerGroup
              const isHovered = hovered === key
              const matches = key.match(/^(\d+)-(\d+)$/).slice(1)
              const [group, card] = matches.map(v => +v)
              const bottom = i === nCardGroups - 1 ? " choose-card-bottom" : ""
              return (
                <div
                  key={key}
                  className="choose-card-wrapper"
                  style={{
                    "--i": i,
                    "--j": j,
                    "--scale": isHovered ? 1.2 : 1,
                    zIndex: isHovered ? 99 : 0
                  }}
                >
                  <Card
                    cardKey={key}
                    faceup={faceup}
                    rotation={0}
                    className="choose-card"
                    onClick={e => touchCard(e, key)}
                  />
                  <p
                    className="choose-card-vote centered-text light-text small-text"
                    style={{
                      display: votedFor != null ? "initial" : "none",
                      opacity: voted ? 1 : 0,
                      color: votedFor === key ? "yellow" : null
                    }}
                  >
                    {votes[key]}
                  </p>
                  <p
                    className={
                      "choose-card-name centered-text light-text small-text" +
                      bottom
                    }
                    style={{
                      display: isHovered ? "initial" : "none",
                      opacity: isHovered ? 1 : 0
                    }}
                  >
                    {text.cards[group][card]}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="choose-globe-container">
          <div className="choose-globe choose-globe-right" />
        </div>
      </div>
      <Link
        className="back-button"
        to={-1}
        style={{ opacity: voted ? 1 : 0.5 }}
      >
        <p className="light-text">&lt; {text.button.back}</p>
      </Link>
    </div>
  )
}
