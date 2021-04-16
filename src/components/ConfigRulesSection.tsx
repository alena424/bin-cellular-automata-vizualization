import Rule from "./Rule";
import React from "react";
import { RuleType } from "../models/cellModel";

type ConfigRulesProps = {
    rules: RuleType[]
    ruleLength: number
    randomInitRules: () => void
    clearRules: () => void
}

const ConfigRulesSection:React.FC<ConfigRulesProps> = (props) => {
    const {rules, ruleLength, randomInitRules, clearRules} = props
    return (
        <div className="section card">
            <h3 className="subtitle">Create rules manually</h3>
            <div className="columns is-multiline">
                {rules.map(((rule, key) =>
                        <Rule rule={rule} ruleLength={ruleLength} key={key}/>
                ))}
            </div>
            <div className="row">
                <div className={"configItem"}>
                    <button className="button is-info" onClick={randomInitRules}>Random Init rules</button>
                </div>
                <div className={"configItem "}>
                    <button className="button is-danger" onClick={clearRules}>Clear rules</button>
                </div>
            </div>
        </div>
    )
}

export default ConfigRulesSection;
