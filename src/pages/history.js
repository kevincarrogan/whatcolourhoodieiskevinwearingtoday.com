import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import extrapolateDates from "utils/extrapolate-dates";

import History from "components/history";

import "components/main.css";
import "components/history.css";

const colourEdgesToColoursWithDate = edges =>
  edges.map(({ node }) => [node.hex, node.colour, node.date]);

const HistoryPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges;
  const coloursWithDate = colourEdgesToColoursWithDate(colours);
  const extrapolatedColours = extrapolateDates(coloursWithDate, new Date());

  return (
    <React.Fragment>
      <History coloursWithDate={extrapolatedColours} />
      <Helmet>
        <style type="text/css">{`
          body {
              background-color: #${hex};
          }
        `}</style>
        <link
          href="https://fonts.googleapis.com/css?family=Nunito:700"
          rel="stylesheet"
        />
        <meta charSet="utf-8" />
        <title>History</title>
      </Helmet>
    </React.Fragment>
  );
};

export default HistoryPage;

export const query = graphql`
  query {
    current: allColoursJson(limit: 1) {
      edges {
        node {
          colour
          hex
        }
      }
    }
    colours: allColoursJson {
      edges {
        node {
          colour
          hex
          date(formatString: "D MMM Y")
        }
      }
    }
  }
`;
