import { LotrContext } from "../context";
import React from "react";
import styled from "styled-components";
import { ButtonShadow, CancelBtn } from "./atoms/Button";
import { onlyMultiplesOtherwise } from "../dataHelpers";
import { filterHeroes } from "../utils";
import { Hero } from "../types";
import { Paragraph, SectionHeader } from "./atoms/typography";
import { ContainerCurrentCards, ContainerFlex } from "./atoms/Container";
import { HeroCard } from "./atoms/HeroCard";
import { CancelImage } from "./atoms/CancelImage";

const TopHeader = styled(SectionHeader)`
  margin: 30px 30px;
`;

const ContainerCurrentHeroes = styled(ContainerFlex)`
  display: flex;
  gap: 15px;
  margin: 30px 30px;
  flexdirection: "row";
`;

function CurrentHeroes() {
  const { campaign, setCampaign } = React.useContext(LotrContext);

  let current: Hero[] = filterHeroes(
    { alive: true, current: true },
    campaign.allHeroes
  );

  function killHero(heroCode: string) {
    // add alert when one "duplicate" is already killed
    let killedHeroAsObjectOldName = onlyMultiplesOtherwise.find(
      (hero) => hero.code === heroCode
    );
    let multiplesWithUnchangedName = onlyMultiplesOtherwise.filter(
      (hero) => hero.name === killedHeroAsObjectOldName?.name
    );
    let codes = multiplesWithUnchangedName.map((hero) => hero.code);
    let multiplesInCurrentState = campaign.allHeroes.filter((hero) =>
      codes.includes(hero.code)
    );
    let isOneDuplicateDead = multiplesInCurrentState.find(
      (hero) => hero.alive === false
    );

    setCampaign({
      ...campaign,
      allHeroes: campaign.allHeroes.map((hero) => {
        if (hero.code === heroCode) {
          if (codes.includes(heroCode) && isOneDuplicateDead) {
            alert("The hero comes in clones. Do you want to procede?");
          }
          hero.alive = false;
          hero.current = false;
          return hero;
        } else {
          return hero;
        }
      }),
    });
  }

  // refactor return below into styled components as well
  return (
    <div style={{ minHeight: "300px" }}>
      <div>
        <TopHeader>Current heroes:</TopHeader>
        <ContainerCurrentHeroes>
          {current.map(
            (current: Hero): JSX.Element => (
              <ContainerCurrentCards key={current.code}>
                <Paragraph>
                  {current.name}
                  <CancelBtn>
                    <CancelImage
                      alt=""
                      src={require("../images/cancel-1.png")}
                    ></CancelImage>
                  </CancelBtn>
                </Paragraph>
                <HeroCard
                  alt=""
                  src={require(`../images/${current.imagesrc}`)}
                />
                <div>
                  <ButtonShadow onClick={() => killHero(current.code)}>
                    Send to coffin
                  </ButtonShadow>
                </div>
              </ContainerCurrentCards>
            )
          )}
        </ContainerCurrentHeroes>
      </div>
    </div>
  );
}

export default CurrentHeroes;
