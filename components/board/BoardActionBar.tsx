import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeBoardState } from "../../redux/board/board";
import { IBoardActionType } from "../../redux/board/board-type";
import React from "react";

export default function BoardActionBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BoardActionBarLayout>
        <BoardActionBtnArea>{children}</BoardActionBtnArea>
      </BoardActionBarLayout>
    </>
  );
}

const BoardActionBarLayout = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  padding: 10px 0px 10px 10px;
`;

const BoardActionBtnArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
  gap: 5px;
`;
