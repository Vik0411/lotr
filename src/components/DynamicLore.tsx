import React, { useEffect, useState } from "react";
import { LotrContext } from "../context";
import { filterHeroes } from "../utils";

export function DynamicLore() {
  const { campaign } = React.useContext(LotrContext);
  const currentHeroes = filterHeroes(
    {
      alive: true,
      current: true,
    },
    campaign.allHeroes
  );

  const currentFlavors = currentHeroes.map((hero) =>
    hero.flavor?.replaceAll("<cite>", "~").replaceAll("</cite>", " ")
  );
  const [currIndex, setCurrIndex] = useState<number>(0);
  const goal = currentFlavors.length;

  useEffect(() => {
    if (currIndex !== goal) {
      const timer = setTimeout(() => {
        setCurrIndex(currIndex + 1);
      }, 15000);
      return () => clearTimeout(timer);
    } else {
      setCurrIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currIndex, currentFlavors]);

  return (
    <div style={{ minHeight: "220px", margin: "0 40px" }}>
      <p>{currentFlavors[currIndex]}</p>
    </div>
  );
}
