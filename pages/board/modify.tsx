import { useRouter } from "next/router";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BoardActionBar from "../../components/board/BoardActionBar";
import { IBoardInfo } from "../../components/board/BoardListArea";
import { proxy } from "../api/proxy";

export default function BoardModify() {
  const router = useRouter();
  const [boardInfo, setBoardInfo] = useState<IBoardInfo>();

  const modifyBoard = useCallback(() => {
    if (boardInfo != undefined) {
      if (
        boardInfo.content_title == undefined ||
        boardInfo.content_title == ""
      ) {
        return alert("제목을 입력해주세요.");
      } else if (
        boardInfo.content_description == undefined ||
        boardInfo.content_description == ""
      ) {
        return alert("내용을 입력해주세요.");
      }
    }

    proxy
      .put("board", {
        auto_id: router.query["id"],
        title: boardInfo?.content_title,
        body: boardInfo?.content_description,
      })
      .then(() => {
        alert("게시글이 수정되었습니다.");
        router.back();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    router.back();
  }, [boardInfo, router]);

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
            onClick={() => modifyBoard()}
          >
            저장
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
          <>
            <BoardModifyAreaLayout>
              <TextField
                id="outlined-basic"
                label="제목"
                variant="outlined"
                defaultValue={boardInfo.content_title}
                onChange={(event) =>
                  setBoardInfo({
                    ...boardInfo,
                    content_title: event.target.value,
                  })
                }
              />
              <TextField
                id="outlined-basic"
                label="내용"
                variant="outlined"
                multiline
                defaultValue={boardInfo.content_description}
                onChange={(event) =>
                  setBoardInfo({
                    ...boardInfo,
                    content_description: event.target.value,
                  })
                }
              />
            </BoardModifyAreaLayout>
          </>
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
`;

const BoardModifyAreaLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 800px;
  gap: 20px;
  overflow-y: auto;
  padding: 10px 10px 20px 20px;

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
