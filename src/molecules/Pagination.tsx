import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import range from "lodash.range";
import { animations } from "../utils/animations";
import { colors } from "../utils/colors";

interface Props {
  currentPage: number;
  totalPages: number;
}

const Gap: React.FC<{}> = () => (
  <PaginationGap>
    <span>&hellip;</span>
  </PaginationGap>
);

export const Pagination: React.FC<Props> = ({ currentPage, totalPages }) => {
  const padding = 3;
  const pages = [
    ...range(currentPage - padding, currentPage).filter((page) => page >= 1),
    ...range(currentPage, currentPage + padding + 1).filter((page) => page <= totalPages),
  ];

  return (
    <Wrapper>
      <List>
        {currentPage > 1 && (
          <li>
            <PaginationLink partiallyActive={false} to={`${currentPage === 2 ? `/` : `/${currentPage - 1}`}`}>
              戻る
            </PaginationLink>
          </li>
        )}
        {currentPage > padding + 1 && <Gap />}
        {pages.map((page) => (
          <li key={`pagination_${page}`}>
            <PaginationLink partiallyActive={currentPage === page} to={`${page === 1 ? `/` : `/page/${page}`}`}>
              {page}
            </PaginationLink>
          </li>
        ))}
        {currentPage + padding < totalPages && <Gap />}
        {currentPage < totalPages && (
          <li>
            <PaginationLink partiallyActive={false} to={`/page/${currentPage + 1}`}>
              次へ
            </PaginationLink>
          </li>
        )}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 0;
  padding: 0 15px;
  position: relative;
`;

const List = styled.ul`
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li + li {
    margin: 0 0 0 10px;
  }
`;

const PaginationGap = styled.li`
  align-items: flex-end;
  color: ${colors.GREY};
  display: flex;
  font-size: 1.3rem;
  padding: 0 5px;
  height: 48px;
`;

const PaginationLink = styled(Link)`
  align-items: center;
  background-color: ${(props) => (props.partiallyActive ? colors.GREY_LIGHTER : colors.WHITE)};
  border: none;
  border-radius: 4px;
  color: ${(props) => (props.partiallyActive ? colors.TEXT_SUB : colors.GREY_DARKER)};
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  justify-content: center;
  padding: 0;
  min-width: 48px;
  height: 48px;
  transition: all 0.2s ${animations.TRANSITION};

  &:hover {
    background-color: ${(props) => (props.partiallyActive ? colors.GREY_LIGHTER : colors.LINK)};
    color: ${(props) => (props.partiallyActive ? colors.TEXT_SUB : colors.WHITE)};
  }
`;
