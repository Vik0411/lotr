import React from "react";
import { Scenario } from "../types";
import { CancelBtn } from "./atoms/CancelBtn";
import { CancelImage } from "./atoms/CancelImage";
import { ListItemWithWhiteText } from "./atoms/ListItemWithWhiteText";
import { LotrContext } from "../context";
import { motion } from "framer-motion";

export function WonScenario({ name, index }: Scenario) {
  const { campaign, setCampaign } = React.useContext(LotrContext);

  function returnScenario(scenarioIndex) {
    setCampaign({
      ...campaign,
      scenarios: campaign.scenarios.map((scenario) => {
        if (scenario.index === scenarioIndex) {
          scenario.won = false;
          return scenario;
        } else {
          return scenario;
        }
      }),
    });
  }
  return (
    <ListItemWithWhiteText style={{ margin: "10px 300px" }}>
      <motion.div
        style={{ margin: "30px 30px", textAlign: "center" }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {name}
        <CancelBtn onClick={() => returnScenario(index)}>
          <CancelImage alt="" src="images/cancel-1.png"></CancelImage>
        </CancelBtn>
      </motion.div>
    </ListItemWithWhiteText>
  );
}
