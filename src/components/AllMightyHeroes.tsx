import { SectionHeader } from "./atoms/typography";
import { ButtonShadow } from "./atoms/Button";
import { LotrContext } from "../context";
import React, { useEffect, useState } from "react";

import { filterHeroes } from "../utils";
import { Hero } from "../types";
import { SelectFfgHero } from "./atoms/SelectFfgHero";
import { styled } from "styled-components";
import { onlyMultiplesOtherwise } from "../dataHelpers";

export const ButtonShadowGreen = styled(ButtonShadow)`
  opacity: 1;
  &:not([disabled]):active {
    box-shadow: #90ee90 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

function AllMightyHeroes() {
  const { campaign, setCampaign } = React.useContext(LotrContext);
  let notCurrentAndAlive = filterHeroes(
    { alive: true, current: false },
    campaign.allHeroes
  );

  const [preparedHero, setPreparedHero] = useState(notCurrentAndAlive[0]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedHero = campaign.allHeroes.find(
      (hero) => hero.code === e.target.value
    );
    if (selectedHero) {
      setPreparedHero(selectedHero);
    }
  }

  function prepareHero(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // before preparing a hero with same name as already prepared, get a confirmation to do so
    let selectedHeroAsObjectOldName = onlyMultiplesOtherwise.find(
      (hero) => hero.code === preparedHero.code
    );
    let multiplesWithUnchangedName = onlyMultiplesOtherwise.filter(
      (hero) => hero.name === selectedHeroAsObjectOldName?.name
    );
    let codes = multiplesWithUnchangedName.map((hero) => hero.code);
    let multiplesInCurrentState = campaign.allHeroes.filter((hero) =>
      codes.includes(hero.code)
    );
    let isOneDuplicatePrepared = multiplesInCurrentState.find(
      (hero) => hero.current === true
    );

    function prepareClone() {
      const text =
        "At least one hero with the same name is already prepared. Are you sure you want to procede?";
      // eslint-disable-next-line no-restricted-globals
      if (confirm(text) === true) {
        return true;
      } else {
        return false;
      }
    }

    if (codes.includes(preparedHero.code) && isOneDuplicatePrepared) {
      if (!prepareClone()) {
        return;
      }
    }

    setCampaign({
      ...campaign,
      allHeroes: campaign.allHeroes.map((hero) => {
        if (hero.code === preparedHero.code) {
          hero.current = true;
          return hero;
        } else {
          return hero;
        }
      }),
    });
  }

  useEffect(() => {
    let notCurrentAndAlive = filterHeroes(
      { alive: true, current: false },
      campaign.allHeroes
    );
    setPreparedHero(notCurrentAndAlive[0]);
    localStorage.setItem("campaign", JSON.stringify(campaign));
  }, [campaign]);

  return (
    <div>
      <SectionHeader>Add to Current Campaign</SectionHeader>
      <form onSubmit={prepareHero}>
        <SelectFfgHero value={preparedHero.code} onChange={handleChange}>
          {notCurrentAndAlive.map((notCurrent: Hero) => (
            <option key={notCurrent.code} value={notCurrent.code}>
              {notCurrent.name}
            </option>
          ))}
        </SelectFfgHero>
        <ButtonShadowGreen type="submit">Prepare</ButtonShadowGreen>
      </form>
    </div>
  );
}

export default AllMightyHeroes;
