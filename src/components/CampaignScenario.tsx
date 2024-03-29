import { SectionHeader } from "./atoms/typography";
import { ButtonShadow } from "./atoms/ButtonShadow";
import { LotrContext } from "../context";
import React, { useEffect, useState } from "react";

import { filterScenarios } from "../utils";
import { Scenario } from "../types";
import { SelectFfgHero } from "./atoms/SelectFfgHero";
import { styled } from "styled-components";
import ConfirmationModal from "./ConfirmModal";
import { motion } from "framer-motion";

export const ButtonShadowGreen = styled(ButtonShadow)`
  opacity: 1;
  &:not([disabled]):active {
    box-shadow: #90ee90 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

function CampaignScenario() {
  const { campaign, setCampaign } = React.useContext(LotrContext);
  const [cloneModal, setCloneModal] = useState(false);

  function procede() {
    setCloneModal(false);
  }
  function doNotProceed() {
    setCloneModal(false);
  }

  const notCurrentAndNotWon = filterScenarios(
    { won: false, current: false },
    campaign.scenarios
  );
  const chosenCurrentScenario = campaign.scenarios.find(
    (scenario) => scenario.current === true
  );

  const [selectedScenario, setSelectedScenario] = useState(
    notCurrentAndNotWon[0]
  );

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedScenario = campaign.scenarios.find(
      (scenario) => scenario.name === e.target.value
    );
    if (selectedScenario) {
      setSelectedScenario(selectedScenario);
    }
  }

  function addScenarioToCurrent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // confirmation when one scneario is already current
    if (chosenCurrentScenario) {
      if (chosenCurrentScenario !== selectedScenario) {
        setCloneModal(true);
        return;
      }
    }

    setCampaign({
      ...campaign,
      scenarios: campaign.scenarios.map((scenario: Scenario) => {
        if (scenario === selectedScenario) {
          scenario.current = true;
          return scenario;
        } else {
          return scenario;
        }
      }),
    });
  }

  useEffect(() => {
    const notCurrentAndNotWon = filterScenarios(
      { won: false, current: false },
      campaign.scenarios
    );
    setSelectedScenario(notCurrentAndNotWon[0]);
    localStorage.setItem("campaign", JSON.stringify(campaign));
  }, [campaign]);

  const modalText =
    "At least one scenario has been already selected. Let us first battle that through!";

  return (
    <div
      style={{
        marginLeft: "30px",
        marginRight: "30px",
        overflow: "hidden",
      }}
    >
      {cloneModal && (
        <ConfirmationModal
          procede={procede}
          doNotProceed={doNotProceed}
          modalText={modalText}
        />
      )}
      <SectionHeader style={{ textAlign: "center", marginTop: "50px" }}>
        Specify Current Campaign Scennario
      </SectionHeader>
      <div
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
          }}
        >
          <form
            name="addscen"
            onSubmit={addScenarioToCurrent}
            style={{ textAlign: "center" }}
          >
            <SelectFfgHero
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              as={motion.select}
              value={selectedScenario.name}
              onChange={handleChange}
              name="scenario"
            >
              {notCurrentAndNotWon.map((notCurrent) => (
                <option key={notCurrent.index} value={notCurrent.name}>
                  {notCurrent.name}
                </option>
              ))}
            </SelectFfgHero>
            <ButtonShadowGreen
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="submit"
            >
              Add Scenario
            </ButtonShadowGreen>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CampaignScenario;
