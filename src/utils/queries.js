import { graphql } from "gatsby";

export const currentFragment = graphql`
  fragment CurrentFragment on Query {
    current: allDays(filter: { id: { ne: "dummy" } }, limit: 1) {
      edges {
        node {
          colour
          hex
        }
      }
    }
  }
`;

export const coloursFragment = graphql`
  fragment ColoursFragment on Query {
    colours: allDays(filter: { id: { ne: "dummy" } }) {
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
