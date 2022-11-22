import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { proxy } from "../../pages/api/proxy";
import BoardActionBar from "./BoardActionBar";
import { BoardItemArea } from "./BoardItemArea";

export interface IBoardInfo {
  content_auto_id?: number;
  content_title?: String;
  // content_body?: String;
  content_description?: String;
  content_date?: String;
}

export default function BoardListArea() {
  const router = useRouter();
  const [boardList, setBoardList] = useState<IBoardInfo[]>();

  const getBoardList = useCallback(() => {
    proxy
      .get("board/list")
      .then((data) => {
        console.log(data);
        setBoardList(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  useEffect(() => {
    getBoardList();
  }, []);

  console.log("boardList", boardList);

  return (
    <>
      <Root>
        <BoardActionBar>
          <Button
            variant="contained"
            style={{ height: "70%" }}
            onClick={() => router.push("board/create")}
          >
            작성
          </Button>
        </BoardActionBar>
        {boardList != undefined ? (
          <>
            <BoardListAreaLayout>
              <BoardList>
                {boardList.length != 0 ? (
                  boardList.map((boardData: IBoardInfo, index: number) => {
                    return (
                      <BoardItemArea
                        key={index}
                        data={boardData}
                        onClick={() => {
                          router.push(`board/${boardData.content_auto_id}`);
                        }}
                      />
                    );
                  })
                ) : (
                  <div>데이터가 없습니다.</div>
                )}
              </BoardList>
            </BoardListAreaLayout>
          </>
        ) : (
          <>
            <CircularProgressLayout>
              <CircularProgress />
            </CircularProgressLayout>
          </>
        )}
      </Root>
    </>
  );
}

const Root = styled.div`
  width: 50%;
`;

const BoardListAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 800px;
  gap: 10px;
  overflow-y: auto;
  padding: 5px 2px 20px 20px;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d3dedc;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: inherit;
    border-radius: 10px;
  }
`;

const CircularProgressLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  max-height: 700px;
`;

const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
