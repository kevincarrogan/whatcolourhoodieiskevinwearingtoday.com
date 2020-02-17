import React from "react";
import { graphql } from "gatsby";

import Head from "components/head";
import History from "components/history";

import extrapolateDates from "utils/extrapolate-dates";
import "utils/queries";

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
      <Head hex={hex} title="History" />
    </React.Fragment>
  );
};

export default HistoryPage;

export const query = graphql`
  query {
    ...CurrentFragment
    ...ColoursFragment
  }
`;
