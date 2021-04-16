import React from "react";
import Cell from "./Cell";
import { RuleType } from "../models/cellModel";

type RuleProps = {
    rule: RuleType
    ruleLength: number
}

const Rule: React.FC<RuleProps> = (props) => {
    const { rule, ruleLength } = props;
    const { index, value } = rule;
    console.log(rule,"rule");
    const binaryIndex = index.toString(2).padStart(ruleLength, "0");
    const ruleIndex = [...Array.from(binaryIndex)].map(((bit, idx) => <Cell index={idx}
                                                                            cell={{ active: !!parseInt(bit) }}/>));
    console.log(binaryIndex, index);
    return (
        <div className="column">
            <div className="row">
                {ruleIndex}
            </div>
            <div className="row">
            <Cell index={index} cell={{ active: value }}/>
            </div>
        </div>)
}

export default Rule;
