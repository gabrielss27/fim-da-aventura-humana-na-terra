import React, { Fragment } from "react"

export const Card = ({ faceup, rotation, cardKey, style, ...props }) => {
  const group = cardKey.match(/^(\d+)/)[1]
  return (
    <Fragment>
      <img
        src={`/cards/${group}-back.png`}
        alt=""
        style={{
            backfaceVisibility: "hidden",
            "--rotation": `${rotation}rad`,
            "--y-rotation": faceup ? "180deg" : "0deg",
            ...style
        }}
        {...props}
      />
      <img
        src={`/cards/${cardKey}.png`}
        alt=""
        style={{
          backfaceVisibility: "hidden",
            "--rotation": `${rotation}rad`,
            "--y-rotation": faceup ? "0deg" : "180deg",
            ...style
        }}
        {...props}
      />
    </Fragment>
  )
}
