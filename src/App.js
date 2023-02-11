
import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import { Tenzos } from './Tenzos';
import './App.css';

function App() {

  const [allDice, setAllDice] = useState(
   () => GenerateRandomNumber() || []
  )
  // const [disable, setDisable] = useState(false)

  function GenerateRandomNumber() {
    let randArr = [];
    let lent;
    (allDice.length < 1) ? lent = 10 : lent = allDice.length;
    for (let i = 0; i < lent.length; i++) {
      randArr.push(
        {
          id: nanoid(),
          value: +Math.floor((Math.random() * 6) + 1).toFixed(),
          isLocked: false
        }
      )
    }

    return randArr
  }

  console.log(allDice)

  // useEffect(() => {

  // }, [])

  const lockDie = (id) => {
    setAllDice(prev => prev.map( dice => {
        return (dice.id === id) ? {...dice, isLocked: !dice.isLocked} : dice 
      })
    )
  }

  const handleRoll = () => {
    console.log('Roll dice')
    setAllDice(GenerateRandomNumber())
  }
  // loop through dice
  // if dice.isLocked is false roll dice
  // else do not roll dice


  return (
    <div className="App">
      <main>
        <h1>Tenzies</h1>
        <p className='roll'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <main className='main-tenzo'>

          {allDice.map((die, i) => {
            return <Tenzos
              key={die.id}
              value={die.value}
              picked={die.isLocked}
              handleClick={() => lockDie(die.id)}
            />
          } )}


        </main>

        <div className='roller'>
          <button onClick={handleRoll}>Roll Dice</button>
        </div>
      </main>

    </div>
  );
}

export default App;
