import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

import isLightColour from "utils/is-light-colour";

import styles from "./history.module.css";

import "components/main.css";
import "components/history.css";

import upperFirst from "../utils/upper-first";

const HistoryPage = ({ data }) => {
  const latest = data.current.edges[0].node;
  const hex = latest.hex;
  const colours = data.colours.edges;

  return (
    <React.Fragment>
      <ul className={styles.list}>
        {colours.map((colour, i) => (
          <li
            className={styles.item}
            style={{
              backgroundColor: `#${colour.node.hex}`,
              color: isLightColour(colour.node.hex) ? "#666" : "#fff"
            }}
            key={i}
          >
            <div className={styles.colourName}>
              {upperFirst(colour.node.colour)}
            </div>
            <div className={styles.details}>
              {i === 0 && (
                <Link className={styles.link} to="/">
                  Today
                </Link>
              )}
              {i > 0 && colour.node.date}
            </div>
          </li>
        ))}
      </ul>
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
