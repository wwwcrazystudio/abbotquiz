import styled from 'styled-components';
import { Option } from '../types/interfaces';

interface Props {
  list: Option[];
  className?: string;
  onRemove?: (val: Option) => void;
}

const List = styled.ul`
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  position: relative;
  border-radius: 20px;
  background: #f0f0f0;
  padding: 10px 20px;
  overflow: hidden;
  color: #343a40;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  padding-right: 40px;
`;

const ItemRemove = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
`;

const SelectedList = ({ list, className, onRemove }: Props) => {
  return (
    <div className={className}>
      <List>
        {list.map((el) => (
          <Item key={el.label}>
            {el.label}
            <ItemRemove onClick={() => onRemove && onRemove(el)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.25074 2.26168C2.41134 2.10099 2.62913 2.01072 2.85622 2.01072C3.08331 2.01072 3.3011 2.10099 3.4617 2.26168L7.99465 6.79853L12.5276 2.26168C12.6066 2.17981 12.7011 2.11451 12.8056 2.06959C12.9101 2.02467 13.0224 2.00102 13.1362 2.00003C13.2499 1.99904 13.3626 2.02073 13.4679 2.06383C13.5731 2.10693 13.6688 2.17057 13.7492 2.25105C13.8296 2.33153 13.8932 2.42723 13.9362 2.53257C13.9793 2.63791 14.001 2.75078 14 2.86459C13.999 2.9784 13.9754 3.09088 13.9305 3.19545C13.8856 3.30003 13.8203 3.39461 13.7386 3.47368L9.2056 8.01053L13.7386 12.5474C13.8946 12.709 13.9809 12.9256 13.9789 13.1503C13.977 13.375 13.8869 13.59 13.7281 13.7489C13.5693 13.9079 13.3545 13.998 13.13 14C12.9054 14.0019 12.6891 13.9155 12.5276 13.7594L7.99465 9.22253L3.4617 13.7594C3.30018 13.9155 3.08385 14.0019 2.8593 14C2.63476 13.998 2.41996 13.9079 2.26118 13.7489C2.10239 13.59 2.01232 13.375 2.01037 13.1503C2.00842 12.9256 2.09474 12.709 2.25074 12.5474L6.78369 8.01053L2.25074 3.47368C2.09019 3.31294 2 3.09496 2 2.86768C2 2.64039 2.09019 2.42241 2.25074 2.26168Z"
                  fill="#009CDE"
                />
              </svg>
            </ItemRemove>
          </Item>
        ))}
      </List>
    </div>
  );
};

export { SelectedList };
