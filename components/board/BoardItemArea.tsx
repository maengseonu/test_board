import { useState } from "react";
import styled from "styled-components";
import { IBoardInfo } from "./BoardListArea";

export function BoardItemArea({
  data,
  onClick,
}: {
  data: IBoardInfo;
  onClick: Function;
}) {
  return (
    <>
      <BoardAreaLayout onClick={() => onClick()}>
        <BoardTopArea>
          <BoardTitleArea>{data.content_title}</BoardTitleArea>
          <BoardCreatedDateArea>
            {new Date(`${data.content_date}`).toISOString().substring(0, 10)}
          </BoardCreatedDateArea>
        </BoardTopArea>
        <BoardBottomArea>
          <BoardBodyArea>{data.content_description}</BoardBodyArea>
        </BoardBottomArea>
      </BoardAreaLayout>
    </>
  );
}

const BoardAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
    rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.6);
  height: 80px;
  padding: 10px;

  cursor: pointer;
  :hover {
    background-color: aliceblue;
    font-weight: bold;
  }
`;

const BoardTopArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const BoardTitleArea = styled.div`
  flex: 1;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BoardCreatedDateArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const BoardBottomArea = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const BoardBodyArea = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
