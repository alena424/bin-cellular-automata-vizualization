import React, { useState } from "react";
import { RuleType } from "../models/cellModel";

type ImportRulesSectionProps = {
    setNeighborhood: (a: number) => void
    setRules: (a: RuleType[]) => void
}

const ImportRulesSection:React.FC<ImportRulesSectionProps> = (props) => {
    const {setNeighborhood, setRules} = props

    const [json, setJSON] = useState("")

    const handleChangeJson = (event: any) => {
        setJSON(event.target.value)
    }
    const initFromJson = () => {
        try {
            const jsonParsed = JSON.parse(json);
            const initConfig: number[] = jsonParsed.data;
            const neighborhoodJson: number = parseInt(jsonParsed.neighborhood);
            if (initConfig && neighborhoodJson) {
                const ruleLength = Math.pow(2, neighborhoodJson * 2 + 1);
                if (ruleLength !== initConfig.length) {
                    alert("Rule length must be " + ruleLength)
                } else {
                    setNeighborhood(neighborhoodJson);
                    setRules(initConfig.map((value, index) => ({ value: !!value, index: index })));
                }
            }
        } catch (e) {
            alert("Invalid json")
        }
    }

    return (
        <div className="section">
            <h3 className="subtitle">Import rules</h3>
            <div className="jsonDiv">
                <textarea className="textarea" rows={4} cols={50} onChange={handleChangeJson}
                          placeholder={"Insert JSON values from script"}></textarea>
            </div>
            <br/>
            <button className="button is-primary" onClick={initFromJson}>Inicialize rules</button>
        </div>
    )
}

export default ImportRulesSection;
