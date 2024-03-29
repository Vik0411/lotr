import { useState } from "react";
import { Input } from "./atoms/Input";
import { SectionHeader } from "./atoms/typography";
import { LotrContext } from "../context";
import React from "react";
import { ButtonShadowGreen } from "./AllMightyHeroes";
import { motion } from "framer-motion";

function AddCustomScenario() {
  const { campaign, setCampaign } = React.useContext(LotrContext);
  const [scenarioName, setScenarioName] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setScenarioName(e.target.value);
  }

  function submitCustomScenario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newScenario = {
      ...campaign.scenarios[0],
      name: `${scenarioName} (custom addition)`,
      index: Number(Date.now().toFixed()),
      won: false,
      current: false,
      campaign: "",
    };

    const newScenarios = [...campaign.scenarios, newScenario];
    setCampaign({ ...campaign, scenarios: newScenarios });
    setScenarioName("");
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <SectionHeader
        style={{ fontWeight: "300", fontSize: "25px", marginBottom: "0px" }}
      >
        Add Missing Scenario
      </SectionHeader>
      <form name="addcscen" onSubmit={submitCustomScenario}>
        <Input
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          as={motion.input}
          type="text"
          name="custom scenario"
          value={scenarioName}
          onChange={handleChange}
          placeholder="custom scenario name"
        />
        <ButtonShadowGreen
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          value="sumbit"
          type="submit"
        >
          Add
        </ButtonShadowGreen>
      </form>
    </div>
  );
}

export default AddCustomScenario;
