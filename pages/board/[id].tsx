import { useRouter } from "next/router";
import { Button, CircularProgress } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import BoardActionBar from "../../components/board/BoardActionBar";
import { IBoardInfo } from "../../components/board/BoardListArea";
import { proxy } from "../api/proxy";

export default function BoardDetail() {
  const router = useRouter();
  const [boardInfo, setBoardInfo] = useState<IBoardInfo>();

  const getBoardData = useCallback(() => {
    const boardId = router.query["id"];

    proxy
      .get("board", {
        params: {
          auto_id: boardId,
        },
      })
      .then((data) => {
        setBoardInfo(data[0]);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [router]);

  const deleteBoard = useCallback(async () => {
    if (confirm("게시글을 삭제하시겠습니까?")) {
      const boardId = router.query["id"];

      proxy
        .delete("board", {
          params: {
            auto_id: boardId,
          },
        })
        .then(() => {
          alert("게시글이 삭제되었습니다");
          router.back();
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }, []);

  useEffect(() => {
    getBoardData();
  }, []);

  return (
    <>
      <Root>
        <BoardActionBar>
          <Button
            variant="contained"
            style={{ height: "70%" }}
            color="success"
            disabled={boardInfo == undefined ? true : false}
            onClick={() =>
              router.push({
                pathname: "/board/modify",
                query: { id: router.query["id"] },
              })
            }
          >
            수정
          </Button>
          <Button
            variant="contained"
            style={{ height: "70%" }}
            color="error"
            onClick={() => deleteBoard()}
          >
            삭제
          </Button>
          <Button
            variant="contained"
            style={{ height: "70%" }}
            color="error"
            onClick={() => router.back()}
          >
            취소
          </Button>
        </BoardActionBar>
        {boardInfo != undefined ? (
          <BoardAreaLayout>
            <BoardTopArea>
              <BoardTitleArea>{boardInfo.content_title}</BoardTitleArea>
              <BoardCreatedDateArea>
                {new Date(`${boardInfo.content_date}`)
                  .toISOString()
                  .substring(0, 10)}
              </BoardCreatedDateArea>
            </BoardTopArea>
            <BoardBottomArea>
              <BoardBodyArea>{boardInfo.content_description}</BoardBodyArea>
            </BoardBottomArea>
          </BoardAreaLayout>
        ) : (
          <CircularProgressLayout>
            <CircularProgress />
          </CircularProgressLayout>
        )}
      </Root>
    </>
  );
}

const Root = styled.div`
  width: 50%;
  height: 800px;
`;

const BoardAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 3px -2px,
    rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px;
  letter-spacing: 0.01071em;
  color: rgba(0, 0, 0, 0.6);
  max-height: 700px;
  padding: 20px 20px 20px 20px;
  gap: 30px;
  overflow-y: hidden;
`;

const CircularProgressLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  max-height: 700px;
`;

const BoardTopArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const BoardTitleArea = styled.div`
  flex: 1;
  width: 100%;
  font-size: 30px;

  overflow: hidden;
  white-space: normal;
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
  max-height: 600px;
  height: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 25px;
  overflow-y: scroll;
  padding-right: 10px;

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
