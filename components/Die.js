import React from 'react'

export default function Die(props) {
  const changeColor = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  }

  return (
    <div className="prop" style={changeColor} onClick={props.holdDice}>
      <h2 className="die-num">{props.value}</h2>{' '}
    </div>
  )
}
