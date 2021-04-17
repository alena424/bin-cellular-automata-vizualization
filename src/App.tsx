import React, { useState } from 'react';
import './App.css';
import Automata from "./components/Automata";
import { CellType, RuleType } from "./models/cellModel";
import { compareArrays, emptyArray, emptyRule, generateNewRow, randomArray, randomRule } from "./utils/cellUtils";
import AutomataConfig from "./components/AutomataConfig";
import ConfigRulesSection from "./components/ConfigRulesSection";
import ImportRulesSection from "./components/ImportRulesSection";

const defaultNumberOfCells = 10
const defaultNumberOfMaxSteps = 10
const defaultDelay = 1000

const App: React.FC = () => {
    const [boardWidth, setBoardWidth] = useState<number>(defaultNumberOfCells);
    const [neighborhood, setNeighborhood] = useState<number>(1);
    const [running, setRunning] = useState<NodeJS.Timeout | undefined>(undefined);
    const [delay, setDelay] = useState<number>(defaultDelay);
    const [iterations, setIteration] = useState<number>(0);
    const [rows, setRows] = useState<CellType[][]>([randomArray(boardWidth)]);
    const [maxNumberSteps, setMaxNumberSteps] = useState<number>(defaultNumberOfMaxSteps);
    const ruleLength = neighborhood * 2 + 1;
    const numberOfRules = Math.pow(2, ruleLength);
    const [rules, setRules] = useState<RuleType[]>(randomRule(numberOfRules));

    React.useEffect(() => {
        setRules(randomRule(numberOfRules))
    }, [numberOfRules])

    const initBoard = () => {
        setIteration(0)
        setRows([randomArray(boardWidth)])
    }
    const clear = () => {
        setIteration(0)
        setRows([emptyArray(boardWidth)])
    }

    const nextInterval = () => {
        if (iterations >= maxNumberSteps) return;
        setIteration((iterations) => {
            return iterations + 1
        })
        setRows((rows) => {
            const newRows = [...rows];
            const generatedNewRow = generateNewRow(rows[rows.length - 1], neighborhood, rules);
            newRows.push(generatedNewRow);
            return newRows;
        })
    }

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


    React.useEffect(() => {
        if (rows.length < 2) return
        if (compareArrays(rows[rows.length - 1], rows[rows.length - 2])) {
            _setRunning(false)
        }
    }, [rows])

    React.useEffect(() => {
        if (iterations >= maxNumberSteps) {
            _setRunning(false)
        }
    }, [iterations, maxNumberSteps])


    const actions = (
        <div className="buttons is-centered">
            <div className={"configItem"}>
                {
                    running
                        ? <button className="button is-danger" onClick={() => _setRunning(false)}>Stop</button>
                        : <button className="button is-success" onClick={() => _setRunning(true)}>Start</button>
                }
            </div>
            <div className={"configItem"}>
                <button className="button is-info" onClick={nextInterval}>Step</button>
            </div>
            <div className={"configItem"}>
                <button className="button is-info" onClick={initBoard}>Random Init</button>
            </div>
            <div className={"configItem "}>
                <button className="button is-danger" onClick={clear}>Clear</button>
            </div>
        </div>
    )
    const onClick = (cell: CellType, key: number) => {
        if (iterations === 0) {
            const newCell: CellType = { ...cell, active: !cell.active }
            const newRows = [...rows];
            newRows[0][key] = newCell
            setRows(newRows);
        }
    }

    return (
        <div className="App container">
            <h1 className="title">BIN - visualization cellular automata</h1>
            <AutomataConfig
                boardWidth={boardWidth}
                delay={delay}
                maxNumberSteps={maxNumberSteps}
                setMaxNumberSteps={setMaxNumberSteps}
                neighborhood={neighborhood}
                setNeighborhood={(value) => {
                    setNeighborhood(value)

                }}
                setBoardWidth={setBoardWidth}
                setDelay={setDelay}
            />
            <br/>
            <br/>
            <div>
                {rows.map((row, key) => (
                    <Automata cells={row}
                              key={key}
                              onClick={key === 0 ? onClick : undefined}
                    />
                ))}
            </div>
            <br/>
            Iteration: <span className="tag is-success">{iterations}</span>
            <br/>
            <br/>
            {actions}
            <ConfigRulesSection
                ruleLength={ruleLength}
                rules={rules}
                setRules={setRules}
            />
            <ImportRulesSection
                setNeighborhood={setNeighborhood}
                setRules={setRules}
            />

        </div>
    );
}

export default App;
