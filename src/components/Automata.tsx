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
    console.log(cells)

    return (
        <div className={"row"}>
            {cells.map(cell => <Cell cell={cell}/>)}
        </div>
    );
};

export default Automata;
