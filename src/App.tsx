import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Automata from "./components/Automata";
import { CellType } from "./types";
import { isNumber } from "util";

const App = () => {
    const defaultNumberOfCells = 50
    const [boardWidth, setBoardWidth] = useState<number>(defaultNumberOfCells)
    const [neighborhood, setNeighborhood] = useState<number>(1)
    const [running, setRunning] = useState<NodeJS.Timeout | undefined>(undefined)
    const [speed, setSpeed] = useState<number>(1000)
    const [iterations, setIteration] = useState<number>(0)

    const randomConfig: CellType[] = Array(boardWidth).fill(undefined).map(() => {
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber % 2 === 0) {
            return { active: true }
        }
        return { active: false }
    })

    const [rows, setRows] = useState<CellType[][]>([randomConfig])

    const selectNeighborhood = (e: any) => {
        const val = e.target.value
        setNeighborhood(parseInt(val))
    }

    const initBoard = () => {
        setIteration(0)
        setRows([randomConfig])
    }

    const nextInterval = () => {
        const newRows = [...rows]
        newRows.push(randomConfig)
        setRows( (rows) => {
            const newRows = [...rows]
            newRows.push(randomConfig)
            return newRows
        })
        setIteration((iterations) => iterations + 1)
    }

    const _setRunning = (isRunning: boolean) => {
        if (running) {
            clearInterval(running)
        }
        if( isRunning ) {
            const running = setInterval(nextInterval, speed);
            setRunning(running)
        } else {
            setRunning(undefined)
        }
    }
    const renderConfig = (
        <div className={"row"}>
            <div className={"configItem"}>
                <label>Number of rows: </label>
                <input
                    pattern="^\d*$"
                    defaultValue={boardWidth}
                    style={{ maxWidth: 50 }} type="number"
                    onChange={(val) => {
                        const rows = parseInt(val.currentTarget.value)
                        if (rows >= 10 && rows <= 100) {
                            setBoardWidth(rows)
                        }
                    }}/>
            </div>
            <div className={"configItem"}>
                <label>Surroundings: </label>
                <select name="sur" id="neighborhood" onChange={selectNeighborhood}>
                    <option value="1" selected={neighborhood === 1}>1-neighborhood</option>
                    <option value="2" selected={neighborhood === 2}>2-neighborhood</option>
                </select>
            </div>
            <div className={"configItem"}>
                <label>Speed: </label>
                <input
                    pattern="^\d*$"
                    defaultValue={speed}
                    style={{ maxWidth: 50 }}
                    type="number"
                    onChange={(val) => {
                        const speed = parseInt(val.currentTarget.value)
                        setSpeed(speed)
                    }}/>
            </div>
            <div className={"configItem"}>
                {
                    running
                        ? <button onClick={() => _setRunning(false)}>Stop</button>
                        : <button onClick={() => _setRunning(true)}>Start</button>
                }
            </div>
            <div className={"configItem"}>
                <button onClick={initBoard}>Init</button>
            </div>
        </div>
    )

    return (
        <div className="App">
            <h1>BIN - celulární automat</h1>
            {renderConfig}
            <br/>
            <br/>
            <div>
                {rows.map((row, key) => (
                    <Automata cells={row}
                              key={key}
                    />
                ))}
            </div>
            <br/>
            Iteration: {iterations}
        </div>
    );
}

export default App;
