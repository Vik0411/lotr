import { LotrContext } from "../context";
import React, { useState } from "react";
import { FallenHero } from "./FallenHero";
import { Input } from "./atoms/Input";
import styled from "styled-components";
import { Button } from "./atoms/Button";

const InputFallen = styled(Input)`
  background-color: ${({ theme }) => theme.colors.basicBlack};
  color: ${({ theme }) => theme.colors.basicWhite};
`;

const SendToCoffinBtn = styled(Button)`
  margin-top: 5px;
  background-color: ${({ theme }) => theme.colors.vanSaarGrey};

  &:hover {
    color: ${({ theme }) => theme.colors.basicWhite};
    background-color: ${({ theme }) => theme.colors.vanSaarGrey};
  }
`;

function FallenHeroes() {
  function filterFallen() {
    return campaign.allHeroes.filter((hero) => hero.alive === false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFallenHero(e.target.value);
  }

  const { campaign, setCampaign } = React.useContext(LotrContext);
  const [fallenHero, setFallenHero] = useState("");
  const fallen = filterFallen();

  function addFallenHero(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fallenToBeAdded = campaign.allHeroes.find(
      (hero) => hero.name === fallenHero
    );
    const isAlive = fallenToBeAdded?.alive === true;
    const names = campaign.allHeroes.map((hero) => hero.name);

    //add hero to the list if it isnt there yet
    if (!names.includes(fallenHero)) {
      throw Error("Sorry, your hero is an unknown!");
    }

    if (names.includes(fallenHero) && !isAlive) {
      throw Error("Sorry, your hero is not among the living!");
    }

    if (names.includes(fallenHero) && isAlive) {
      fallenToBeAdded.alive = false;
      setCampaign({ ...campaign });
      localStorage.setItem("campaign", JSON.stringify(campaign));
    }
  }

  return (
    <div>
      <form onSubmit={addFallenHero}>
        <InputFallen
          type="text"
          value={fallenHero}
          placeholder="Input your fallen hero..."
          onChange={handleChange}
        />
        <SendToCoffinBtn type="submit">Send to the coffin</SendToCoffinBtn>
        <h3>The Fallen:</h3>
        <ul>
          {fallen.map(
            (fallenHero): JSX.Element => (
              <FallenHero fallenHero={fallenHero.name} key={fallenHero.name} />
            )
          )}
        </ul>
      </form>
    </div>
  );
}

export default FallenHeroes;
