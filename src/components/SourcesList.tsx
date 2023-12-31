import { useState } from 'react';

import sources from '../data/sourcesData.json';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Toggler = styled.button<{ $active: boolean }>`
  width: 100%;
  position: relative;
  padding: 24px;
  border-radius: 4px;
  background: var(--background-white, #fff);
  box-shadow: 0px 0px 22px 0px rgba(178, 212, 240, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: var(--primary-main);
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;

  svg {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    margin-left: 42px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    line-height: 20px;
    padding: 16px;
  }

  ${(props) =>
    props.$active &&
    `
      box-shadow: none;
      border-radius: 4px 4px 0 0;
    `}
`;

const Content = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 0 0 4px 4px;
  background: var(--background-white, #fff);
  box-shadow: 0px 0px 22px 0px rgba(178, 212, 240, 0.2);
  padding-top: 0;
`;

const List = styled.ol`
  padding-left: 24px;
  margin: 0;
  color: var(--text-secondary, #8c8c8c);
  font-family: Calibri;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;

const Item = styled.li``;

const SourcesList = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Wrap>
      <Toggler $active={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        Ключевые источники информации
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          transform={`rotate(${expanded ? -90 : 0})`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.89164 2.73051C5.19205 2.42487 5.67909 2.42487 5.9795 2.73051L11.1077 7.94791C11.252 8.09467 11.333 8.29373 11.333 8.5013C11.333 8.70885 11.252 8.90791 11.1077 9.05469L5.9795 14.2721C5.67909 14.5777 5.19205 14.5777 4.89164 14.2721C4.59124 13.9664 4.59124 13.4709 4.89164 13.1653L9.47593 8.5013L4.89164 3.83729C4.59124 3.53166 4.59124 3.03614 4.89164 2.73051Z"
            fill="#009CDE"
          ></path>
        </svg>
      </Toggler>
      {expanded && (
        <Content>
          <List>
            {sources.map((item, index) => (
              <Item key={index}>{item}</Item>
            ))}
          </List>
        </Content>
      )}
    </Wrap>
  );
};

export { SourcesList };
