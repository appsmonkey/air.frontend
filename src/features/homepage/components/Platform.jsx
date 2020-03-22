import React from "react";
import styled from "styled-components";

import perks from "../assets/perks.json";
import nyBg from "../assets/new-york.jpg";

import { Subtitle, Title, Description } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${nyBg});
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  padding: 32px 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Center = styled.div`
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  padding: 32px;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 770px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const GridItemTitle = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.primary};
`;

const List = styled.ul`
  list-style-type: circle;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #b7b2d0;
`;

const Platform = () => {
  return (
    <BgWrapper>
      <Wrapper>
        <Center>
          <Subtitle>The CityOS</Subtitle>
          <Title>Platform</Title>
          <Description>Open tools to help your city</Description>
        </Center>
        <Grid>
          {perks.map(perk => {
            return (
              <GridItem key={perk.title}>
                <GridItemTitle>{perk.title}</GridItemTitle>
                <List>
                  {perk.list.map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </List>
              </GridItem>
            );
          })}
        </Grid>
      </Wrapper>
    </BgWrapper>
  );
};

export default Platform;
