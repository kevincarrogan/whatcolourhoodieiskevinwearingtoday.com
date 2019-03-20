import React from 'react';

const Stat = ({ title, colours }) => (
  <article>
    <h1>{title}</h1>
    <ul>
      {colours.map(colour => (
        <li>{colour}</li>
      ))}
    </ul>
  </article>
);

export default Stat;
