import React from 'react';
import {CellType} from "../types";

type CellProps = {
    cell: CellType
}

const Cell: React.FC<CellProps> = props => {
    const {cell} = props

    return (
        <div
            className={"cell"}
            style={cell.active ? {background: "black"} : {background: "white"}}
            onClick={() => console.log("click")}
        />
    )
};

export default Cell;
