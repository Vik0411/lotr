import { Paragraph, SectionHeader } from "./atoms/typography";
import { LotrContext } from "../context";
import React from "react";
import { CancelImage } from "./atoms/CancelImage";
import { doesHaveImage } from "../utils";
import { BorBCard } from "./atoms/BorBCard";
import {
  ContainerCurrentCard,
  ContainerFlex,
  ContainerFlexColumn,
} from "./atoms/Container";
import { CancelBtn } from "./atoms/Button";

function BoonsAndBurdensDisplay() {
  const { campaign, setCampaign } = React.useContext(LotrContext);
  function cancelBoon(boon) {
    let newBoons = campaign.boonsAndBurdens.boons.filter(
      (bn) => bn.index !== boon.index
    );
    let newBB = { ...campaign.boonsAndBurdens, boons: newBoons };
    setCampaign({ ...campaign, boonsAndBurdens: newBB });
  }

  function cancelBurden(burden) {
    let newBurdens = campaign.boonsAndBurdens.burdens.filter(
      (br) => br.index !== burden.index
    );
    let newBB = { ...campaign.boonsAndBurdens, burdens: newBurdens };
    setCampaign({ ...campaign, boonsAndBurdens: newBB });
  }

  return (
    <ContainerFlex>
      <SectionHeader>Boons</SectionHeader>
      <ContainerFlexColumn>
        {campaign.boonsAndBurdens.boons.map((boon) => (
          <div key={boon.index} style={{ margin: "15px 15px" }}>
            {doesHaveImage(boon.image) ? (
              <ContainerCurrentCard style={{ width: "180px" }}>
                <Paragraph>
                  {boon.name}
                  <CancelBtn onClick={() => cancelBoon(boon)}>
                    <CancelImage
                      alt=""
                      src={require("../images/cancel-1.png")}
                    ></CancelImage>
                  </CancelBtn>
                </Paragraph>
                <BorBCard
                  alt=""
                  src={require(`../images/bb/${boon.image}.jpg`)}
                ></BorBCard>
              </ContainerCurrentCard>
            ) : (
              <ContainerCurrentCard key={boon.index}>
                <Paragraph>
                  {boon.name}
                  <CancelBtn onClick={() => cancelBoon(boon)}>
                    <CancelImage
                      alt=""
                      src={require("../images/cancel-1.png")}
                    ></CancelImage>
                  </CancelBtn>
                </Paragraph>
                <BorBCard
                  alt=""
                  src={require(`../images/nonffg.jpg`)}
                ></BorBCard>
              </ContainerCurrentCard>
            )}
          </div>
        ))}
      </ContainerFlexColumn>
      <ContainerFlex>
        <SectionHeader>Burdens</SectionHeader>
        <ContainerFlexColumn>
          {campaign.boonsAndBurdens.burdens.map((burden) => (
            <div key={burden.index} style={{ margin: "15px 15px" }}>
              {doesHaveImage(burden.name) ? (
                <ContainerCurrentCard style={{ width: "180px" }}>
                  <Paragraph>
                    {burden.name}
                    <CancelBtn onClick={() => cancelBurden(burden)}>
                      <CancelImage
                        alt=""
                        src={require("../images/cancel-1.png")}
                      ></CancelImage>
                    </CancelBtn>
                  </Paragraph>
                  <BorBCard
                    alt=""
                    src={require(`../images/bb/${burden.name}.jpg`)}
                  ></BorBCard>
                </ContainerCurrentCard>
              ) : (
                <ContainerCurrentCard key={burden.index}>
                  <Paragraph>
                    {burden.name}
                    <CancelBtn onClick={() => cancelBurden(burden)}>
                      <CancelImage
                        alt=""
                        src={require("../images/cancel-1.png")}
                      ></CancelImage>
                    </CancelBtn>
                  </Paragraph>
                  <BorBCard
                    alt=""
                    src={require("../images/burden.jpg")}
                  ></BorBCard>
                </ContainerCurrentCard>
              )}
            </div>
          ))}
        </ContainerFlexColumn>
      </ContainerFlex>
    </ContainerFlex>
  );
}

export default BoonsAndBurdensDisplay;
