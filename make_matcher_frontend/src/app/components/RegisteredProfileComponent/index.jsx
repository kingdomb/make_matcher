/**
 *
 * RegisteredProfileComponent
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

export function RegisteredProfileComponent(props) {
  const gamesLookup = {};
  Object.values(props.data || {}).forEach(game => {
    gamesLookup[game.value] = game.label;
  });
  return (
    <div>
      <Div>
        <Label>{props.label}</Label>
        {!props.gamesData && <Value>{props.data}</Value>}
      </Div>
      {props.data && (
        <div style={{ paddingLeft: '4rem' }}>
          {props.gamesData &&
            props.gamesData.map(game => {
              const label = gamesLookup[game];
              return label && <Title>{label}</Title>;
            })}
        </div>
      )}
    </div>
  );
}

const Label = styled.h1`
  color: rgb(78, 78, 78);
`;

const Value = styled.h1`
  color: rgb(255, 72, 0);
  margin-left: 2rem;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 4rem;
`;

const Title = styled.h3`
  display: block;
  color: rgb(255, 72, 0);
`;
