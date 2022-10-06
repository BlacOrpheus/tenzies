import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const [die, setDie] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = die.every((die) => die.isHeld)
    const firstValue = die[0].value
    const allSameValue = die.every((dice) => dice.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log('You won!')
    }
  }, [die])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function holdDice(id) {
    setDie((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die
      }),
    )
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (!tenzies) {
      setDie((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        }),
      )
    } else {
      setTenzies(false)
      setDie(allNewDice())
    }
  }

  const diceElements = die.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <div className="App">
      <main className="main">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="prop-Div">{diceElements}</div>

        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </main>
    </div>
  )
}

// value={Array.from({ length: 10 }, () =>
//               Math.floor(Math.random() * 6),
//             )}
