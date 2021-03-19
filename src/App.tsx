import React, { useState } from 'react';
import './App.css';
import Automata from "./components/Automata";
import { CellType } from "./types";

const App = () => {
    const defaultNumberOfCells = 50
    const [boardWidth, setBoardWidth] = useState<number>(defaultNumberOfCells)
    const [neighborhood, setNeighborhood] = useState<number>(1)
    const [running, setRunning] = useState<NodeJS.Timeout | undefined>(undefined)
    const [delay, setDelay] = useState<number>(1000)
    const [iterations, setIteration] = useState<number>(0)
    const [maxNumberSteps, setMaxNumberSteps] = useState<number>(10)

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
        if (iterations >= maxNumberSteps) return;
        setIteration((iterations) => {
            return iterations + 1
        })
        setRows((rows) => {
            const newRows = [...rows];
            const generatedNewRow = generateNewRow(rows[rows.length - 1]);
            newRows.push(generatedNewRow);
            return newRows;
        })
    }
    const sameArrays = (arr1: CellType[], arr2: CellType[]) => {
        for (let i = 0; i < arr1.length; i++){
            if (arr1[i].active !== arr2[i].active){
                return false
            }
        }
        return true
    }

    React.useEffect(() => {
        if (rows.length < 2) return
        if (sameArrays(rows[rows.length-1], rows[rows.length-2])){
            _setRunning(false)
        }
    }, [rows])

    const lookAround = (index: number, row: CellType[]) => {
        let points = 0;
        for (let idx =  index - neighborhood; idx <= index + neighborhood; idx++) {
            if (row[idx] !== undefined) {
                points += row[idx].active ? 1 : 0;
            }
        }
        return points;
    }

    const generateNewRow = (row: CellType[]): CellType[] => {
        return row.map((cell, index) => {
            if (lookAround(index, row) > neighborhood) {
                return { ...cell, active: true };
            }
            return { ...cell, active: false };
        })
    }

    React.useEffect(() => {
        if (iterations >= maxNumberSteps) {
            _setRunning(false)
        }
    }, [iterations])

    const _setRunning = (isRunning: boolean) => {
        if (running) {
            clearInterval(running);
        }
        if (isRunning) {
            const running = setInterval(nextInterval, delay);
            setRunning(running);
        } else {
            setRunning(undefined);
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
                <label>Neighborhood: </label>
                <select name="sur" id="neighborhood" onChange={selectNeighborhood}
                        defaultValue={neighborhood.toString()}>
                    <option value="1">1-neighborhood</option>
                    <option value="2">2-neighborhood</option>
                    <option value="3">3-neighborhood</option>
                    <option value="4">4-neighborhood</option>
                </select>
            </div>
            <div className={"configItem"}>
                <label>Delay: </label>
                <input
                    pattern="^\d*$"
                    defaultValue={delay}
                    style={{ maxWidth: 50 }}
                    type="number"
                    onChange={(val) => {
                        const delay = parseInt(val.currentTarget.value)
                        setDelay(delay)
                    }}/>
            </div>
            <div className={"configItem"}>
                <label>Maximum number of steps: </label>
                <input
                    pattern="^\d*$"
                    defaultValue={maxNumberSteps}
                    style={{ maxWidth: 50 }}
                    type="number"
                    onChange={(val) => {
                        const maxSteps = parseInt(val.currentTarget.value)
                        setMaxNumberSteps(maxSteps)
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
            <h1>BIN - visualization cellular automata</h1>
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
