import React from "react"
import "./Globe.css"
import { ReactComponent as WorldMap } from "../asset/world-map.svg"

export const Globe = ({ size, style, color, duration, offset, className, ...props }) => {
  return (
    <div
      style={{
        "--size": size,
        "--offset": offset || "0%",
        "--duration": duration || "20s",
        ...style
      }}
      className={"globe-container " + (className || "")}
      {...props}
    >
      <WorldMap className="globe-texture" fill={color || "white"} />
      <WorldMap className="globe-texture" fill={color || "white"} />
    </div>
  )
}
