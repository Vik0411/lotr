import styled from "styled-components";
import { ButtonShadow } from "./Button";
import { CancelImage } from "./CancelImage";

// globalStyles.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

// html{
//   scrollbar-color: black green;
//   scrollbar-width: thin;
//   }

export const Container = styled.body`
  display: flex;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  background-image: radial-gradient(transparent, black),
    url(${require("../../images/lighter-bg.jpg")});
  background-size: cover;
  background-position: center;
  text-shadow: 4px 4px 3px black;
  margin-top: 0px;
  box-sizing: border-box;
`;

export const ContainerFlex = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 30px 30px;
`;

export const ContainerFallenHeroes = styled.div`
  column-width: 230px;
  min-height: 60px;
  margin: 65px 20px;
`;

export const ContainerBBDisplay = styled.div`
  column-width: 200px;
  margin: 20px 20px;
`;

export const ContainerCurrentCard = styled.div`
  position: relative;
  width: 250px;
  display: block;
  padding: 20px;
  overflow: hidden;
  transition: all 0.3s;

  @media (max-width: 1024px) {
    width: 220px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }

  &:hover {
    transform: scale(105%);
  }

  &:hover ${ButtonShadow} {
    opacity: 1;
    text-decoration: none;
  }

  &:hover ${CancelImage} {
    transform: scale(90%);
    opacity: 1;
    text-decoration: none;
  }

  &:hover p {
    opacity: 1;
    text-decoration: none;
  }
`;

export const ContainerWithWhiteText = styled.div`
  color: white;
  opacity: 75%;
  margin: 30px 30px;
  text-align: center;
`;
