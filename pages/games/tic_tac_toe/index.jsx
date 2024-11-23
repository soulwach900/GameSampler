import { useState } from 'react'
import '../../style.css'

const GetKeyFromIndex = (index) => {
  const row = Math.floor(index / 3)
  const col = index % 3

  return `${row}-${col}`
}

const GetLabel = (value) => {
  if (!value) {
    return null
  }
  return value > 0 ? 'O' : 'X'
}

function GetInitialState() {
  const state = {}
  for (let i = 0; i < 3; i++) {
    for (let ii = 0; ii < 3; ii++) {
      state[`${i}-${ii}`] = null
    }
  }
  return state
}

function GetWinner(values) {
  for (let i = 0; i < 3; i++) {
    for (let ii = 0; ii < 3; ii++) {
      const sumLines =
        (values[`${i}-${ii}`] || 0) +
        (values[`${i}-${ii + 1}`] || 0) +
        (values[`${i}-${ii + 2}`] || 0);
      if (sumLines === 3 || sumLines === -3) {
        return sumLines;
      }

      const sumCols =
        (values[`${i}-${ii}`] || 0) +
        (values[`${i + 1}-${ii}`] || 0) +
        (values[`${i + 2}-${ii}`] || 0);
      if (sumCols === 3 || sumCols === -3) {
        return sumCols;
      }

      const sumDiagonalRight =
        (values[`${i}-${ii}`] || 0) +
        (values[`${i + 1}-${ii + 1}`] || 0) +
        (values[`${i + 2}-${ii + 2}`] || 0);
      if (sumDiagonalRight === 3 || sumDiagonalRight === -3) {
        return sumDiagonalRight;
      }

      const sumDiagonalLeft =
        (values[`${i}-${ii}`] || 0) +
        (values[`${i + 1}-${ii - 1}`] || 0) +
        (values[`${i + 2}-${ii - 2}`] || 0);
      if (sumDiagonalLeft === 3 || sumDiagonalLeft === -3) {
        return sumDiagonalLeft;
      }
    }
  }
  return null;
}

function CheckTie(values) {
  return Object.values(values).every((value) => value !== null);
}

function TicTacToe() {
  const [values, setValues] = useState(GetInitialState);
  const [player, setPlayer] = useState(1)
  const [winner, setWinner] = useState(null)

  function HandleClick(key) {
    if (winner || values[key]) {
      return
    }
    const newValues = {
      ...values,
      [key]: player,
    }
    setValues(newValues)
    setPlayer(player * -1)
    const newWinner = GetWinner(newValues)
    if (newWinner) {
      setWinner(newWinner > 0 ? 1 : -1);
    } else if (CheckTie(newValues)) {
      setWinner(0);
    }
  }

  function ResetGame() {
    setValues(GetInitialState());
    setPlayer(1);
    setWinner(null);
  }

  return (
    <div>
      <p className='game_text'>
        TIC-TAC TOE
      </p>
      <div className='game_board'>
        {Array.from({ length: 9 }).map((_, index) =>
          <button key={index} type='button' onClick={() => HandleClick(GetKeyFromIndex(index))}>
            {GetLabel(values[GetKeyFromIndex(index)])}
          </button>
        )}
      </div>
      <div className='game_menu'>
        {winner !== null && (
          <p>
            {winner === 0 ? 'Empate!' : `Ganhador: ${winner > 0 ? 'O' : 'X'}`}

            <button type='button' onClick={ResetGame}>
              Reiniciar
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default TicTacToe