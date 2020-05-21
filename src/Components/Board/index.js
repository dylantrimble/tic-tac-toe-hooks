import React, { useState } from 'react';
import Square from '../Square/index';
import ResetButton from '../ResetButton/index';
import r2h from '../../img/r2h.png'
import fellowship from '../../img/fellowships.png'

const Board = () => {
    const intitalBoard = Array(9).fill(null)
    const [squares, setSquares] = useState(intitalBoard)
    const [playerXIsNext, setPlayerXIsNext] = useState(true)


    const winner = calculateWinner(squares)

    const handleClick = (e) => {
        const newSquares = [...squares]
        const winnerDeclared = Boolean(calculateWinner(squares))
        const squareAlreadyFilled = Boolean(newSquares[e])
        if (winnerDeclared || squareAlreadyFilled) return

        newSquares[e] = playerXIsNext ? 'X' : 'O'
        setSquares(newSquares)
        setPlayerXIsNext(!playerXIsNext)
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() =>
            handleClick(i)} />
    }


    function isBoardFull(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] == null) {
                return false;
            }
        }
        return true;
    }


    function getStatus() {
        if (winner) {
            return "Congratulations Player " + winner +
                ", you won!";
        } else if (isBoardFull(squares)) {
            return "Draw!";
        } else {
            return "Next Player is Player: " + (playerXIsNext ? "X" : "O");
        }
    }


    const reset = () => {
        setSquares(intitalBoard)
        setPlayerXIsNext(true)
    }

    /**
 * calculateWinner (helper function)
 *
 * Parameter: squares (array of 'X', '0', or null)
 * Return value: 'X', 'O', or null
 */
    function calculateWinner(squares) {
        /* Squares indexes as they appear in UI:
        0 1 2
        3 4 5
        6 7 8
        */
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]; // shows all of the winning combinations ("lines")

        // Iterate over all the winning line combinations to see if the 
        // input squares array has one of the with all 'X's or all 'O's.
        // If it does, return 'X' or 'O'.
        for (let line of lines) {
            const [a, b, c] = line;
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        // If none of the winning line combinations is contained in 
        // input squares array, return null...
        return null;
    }


    return (
        <>
            <main className={`main--container 
            ${
                (winner && getStatus() === "Congratulations Player " + winner + ", you won!" ||
                    !winner && getStatus() === "Draw!") ?
                    (getStatus() === "Draw!" ? "draw" : "winner")
                    : (playerXIsNext ? "X" : "O")
                }`
            }
            >
                <div className="logo">
                    <img src={r2h} alt="r2h logo" />
                    <img src={fellowship} alt="fellowship" />
                </div>
                <div className="status">
                    {getStatus()}
                </div>

                <div className="board--container">
                    <div className="board">
                        <div className="board--row">
                            {renderSquare(0)}
                            {renderSquare(1)}
                            {renderSquare(2)}
                        </div>
                        <div className="board--row">
                            {renderSquare(3)}
                            {renderSquare(4)}
                            {renderSquare(5)}
                        </div>
                        <div className="board--row">
                            {renderSquare(6)}
                            {renderSquare(7)}
                            {renderSquare(8)}
                        </div>
                    </div>


                    <ResetButton reset={reset} />
                </div>

            </main>
        </>
    )
}

export default Board;


