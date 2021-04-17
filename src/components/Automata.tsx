import React from 'react';
import Cell from "./Cell";
import { CellType, OnClickCell } from "../models/cellModel";

type AutomataProps = {
    cells: CellType[]
    onClick?: OnClickCell
}

const Automata: React.FC<AutomataProps> = props => {
    const { cells, onClick } = props



    return (
        <div className={"row"}>
            {cells.map((cell, key) => <Cell cell={cell} key={key} index={key} onClick={onClick}/>)}
        </div>
    );
};

export default Automata;
