import React from 'react';
import Cell from "./Cell";
import { CellType } from "../types";

const rowsCount = 50

type AutomataProps = {
    cells: CellType[]
}

type Row = {
    cells: [],
}
const Automata: React.FC<AutomataProps> = props => {
    const { cells } = props

    return (
        <div className={"row"}>
            {cells.map((cell, key) => <Cell cell={cell} key={key}/>)}
        </div>
    );
};

export default Automata;
