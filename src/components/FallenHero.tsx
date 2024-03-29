import React from "react";
import { Hero } from "../types";
import { CancelBtn } from "./atoms/CancelBtn";
import { CancelImage } from "./atoms/CancelImage";
import { ListItemWithWhiteText } from "./atoms/ListItemWithWhiteText";
import { LotrContext } from "../context";
import { motion } from "framer-motion";

export function FallenHero({ name, code }: Hero) {
  const { campaign, setCampaign } = React.useContext(LotrContext);

  function resurrectHero(heroCode: string) {
    setCampaign({
      ...campaign,
      allHeroes: campaign.allHeroes.map((hero) => {
        if (hero.code === heroCode) {
          hero.alive = true;
          hero.current = true;
          return hero;
        } else {
          return hero;
        }
      }),
    });
  }
  return (
    <ListItemWithWhiteText
      as={motion.li}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{ textAlign: "center" }}
    >
      {name}
      <CancelBtn onClick={() => resurrectHero(code)}>
        <CancelImage alt="" src="images/cancel-1.png"></CancelImage>
      </CancelBtn>
    </ListItemWithWhiteText>
  );
}
