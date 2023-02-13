
import { useState, useEffect } from 'react'
import {nanoid} from 'nanoid'
import { Tenzos } from './Tenzos';
// import confetti from 'react-confetti'
import './App.css';

function App() {

  const [allDice, setAllDice] = useState(
   () => GenerateRandomNumber() || []
  )
  const [gameWon, setGameWon] = useState(false)

  // We need set the gameWon state based on the the status 
  // of allDice value and isLocked properties
  // we are setting the state of Gamewon based on the 
  // allDice state - we are keeping these 2 pieces of satte in sync with each other
  // we are using one state status to set another state

  useEffect(() => {
    console.log('dice state changed')
    const allLockeed = allDice.every(dice => dice.isLocked)
    const firstArr = allDice[0].value
    const allEqual = allDice.every((dice) => dice.value === firstArr)
    if (allLockeed && allEqual) {
      setGameWon(true)
    }
  }, [allDice])

  // () => {
  //   const {width, height} = useWindowSize()
  //   return (gameWon && <Confetti width={300} height={300} />)
  // }

  function newDie() {
    return {
      id: nanoid(),
      value: +Math.floor((Math.random() * 6) + 1).toFixed(),
      isLocked: false
    }
  }

  function GenerateRandomNumber() {
    let randArr = [];
    for (let i = 0; i < 10; i++) {
      randArr.push(newDie())
    }
    return randArr
  }

// changes allDice state
  const lockDie = (id) => {
    if (!gameWon) {
      setAllDice(prev => prev.map( dice => {
        return (dice.id === id) ? {...dice, isLocked: !dice.isLocked} : dice 
      })
    )
    }

  }

  //  {...dice, value: +Math.floor((Math.random() * 6) + 1).toFixed()} 

  // changes allDice state
  const rollDie = () => {
    console.log('Roll dice')
    if (!gameWon) {
      setAllDice(prev => prev.map( dice => {
        return (dice.isLocked !== true) 
          ? newDie()
          : dice 
      }))
    }else {
      setGameWon(false)
      setAllDice(GenerateRandomNumber())

    }

  }

  // function winStatus() {
  //   setGameWon(allDice => allDice.every((dice, allDice) => ((dice.value === allDice[0].value) && (dice.locked === true)) && true))
  // }



  return (
    <div className="App">
      <main>
        {gameWon && <p>Game won!!!</p>}
        <h1>Tenzies</h1>
        <p className='roll'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <main className='main-tenzo'>
          {/* {gameWon && <Confetti />} */}

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
          <button onClick={rollDie}>{!gameWon ? 'Roll Dice' : 'New Game'}</button>
        </div>
      </main>

    </div>
  );
}

export default App;
