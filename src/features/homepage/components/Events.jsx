import React from "react";
import styled from "styled-components";

import conferenceBg from "../assets/conference.jpg";
import eventsBg from "../assets/events.jpg";
import teamsBg from "../assets/teams.jpg";
import galleryBg from "../assets/gallery.jpg";
import { ReactComponent as LinkIcon } from "../assets/icons/link.svg";
import { ReactComponent as ExternalLinkIcon } from "../assets/icons/external-link.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";

import { Title, Description } from "./Homepage";

const BgWrapper = styled.section`
  background-image: url(${conferenceBg});
  background-size: cover;
  background-position: center;
`;

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const TextWrapper = styled.div`
  padding: 32px;
  @media (min-width: 576px) {
    grid-column: span 2;
  }
  @media (min-width: 992px) {
    grid-column: span 4;
  }
  @media (min-width: 1200px) {
    grid-column: initial;
    grid-row: span 2;
  }
`;

const GridItem = styled.div`
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.bg});
  background-color: ${props => props.theme.primary};
`;

const ColorOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const GridItemTitle = styled.h4`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  color: ${props => props.theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const LinkText = styled.span`
  margin-right: 6px;
`;

const ExternalLink = styled.a`
  color: #fff;
  text-align: center;
`;

const Events = props => {
  return (
    <BgWrapper>
      <Wrapper>
        <Grid>
          <TextWrapper>
            <Title>Events</Title>
            <Description>
              The CityOS event helps local citizens kickstart their own smart
              cities. It combines a community outreach campaign, conference,
              tech workshops, and a 48-hour hackathon, all focused on solving
              the city's specific problems. We bring the most knowledgable
              speakers, instructors, and relevant technology.
            </Description>
            <Description>
              By the end of the final event, the city will already have its
              first functional applications built by its very own.
            </Description>
          </TextWrapper>
          <GridItem bg={eventsBg}>
            <ColorOverlay>
              <GridItemTitle>Events</GridItemTitle>
              <Link>
                <LinkText>Mostar</LinkText> <LinkIcon />
              </Link>
              <Link>
                <LinkText>Dubrovnik 2016</LinkText> <LinkIcon />
              </Link>
              <Link>
                <LinkText>Dubrovnik</LinkText> <LinkIcon />
              </Link>
              <Link>
                <LinkText>Sarajevo</LinkText> <LinkIcon />
              </Link>
            </ColorOverlay>
          </GridItem>
          <GridItem bg={teamsBg}>
            <ColorOverlay>
              <ExternalLink
                href="https://www.youtube.com/watch?v=xuTB222PmXU&list=PLBsKuLLt0q7WRupfdelh42n8aKq-dASp5"
                target="_blank"
                rel="noopener"
              >
                <GridItemTitle>Team projects</GridItemTitle>
                <ExternalLinkIcon />
              </ExternalLink>
            </ColorOverlay>
          </GridItem>
          <GridItem bg={galleryBg}>
            <ColorOverlay>
              <ExternalLink
                href="https://www.facebook.com/pg/cityos.io/photos"
                target="_blank"
                rel="noopener"
              >
                <GridItemTitle>Gallery</GridItemTitle>
                <ExternalLinkIcon />
              </ExternalLink>
            </ColorOverlay>
          </GridItem>
          <GridItem>
            <ColorOverlay>
              <GridItemTitle>Start My Smart City in Weeks</GridItemTitle>
              <ExternalLink
                href="https://s3.amazonaws.com/cityos.io/assets/CityOS+Promo.pdf"
                target="_blank"
                rel="noopener"
              >
                <GridItemTitle>Download Guide</GridItemTitle>
                <DownloadIcon />
              </ExternalLink>
            </ColorOverlay>
          </GridItem>
        </Grid>
      </Wrapper>
    </BgWrapper>
  );
};

export default Events;
