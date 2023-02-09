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

  useEffect(() => {
    voteProvider
      .getVotes()
      .then(v => setVotes(v))
      .catch(e => {
        throw e
      })
  }, [])

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
    setVotedFor(key)
    voteProvider.vote(votedFor).then(vt => {
      setVotes(vt)
      setVoted(true)
      setTimeout(() => setFaceup(true), 2500)
    })
  }

  return (
    <div className="page centered-page choose-page">
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
              return (
                <div
                  key={key}
                  className="choose-card-wrapper"
                  style={{
                    "--i": i,
                    "--j": j
                  }}
                >
                  <Card
                    cardKey={key}
                    faceup={faceup}
                    rotation={0}
                    className="choose-card"
                    onClick={() => vote(key)}
                  />
                  <p
                    className="choose-card-vote centered-text light-text"
                    style={{
                      opacity: voted ? 1 : 0,
                      color: votedFor === key ? "yellow" : null
                    }}
                  >
                    {votes[key]}
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
    </div>
  )
}
