import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import styled from "styled-components";
import BoardActionBar from "../../components/board/BoardActionBar";
import { proxy } from "../api/proxy";

export default function BoardCreate() {
  const router = useRouter();
  const [title, setTitle] = useState<String>();
  const [body, setBody] = useState<String>();

  const saveBoard = useCallback(() => {
    if (title == undefined || title == "") {
      return alert("제목을 입력해주세요.");
    } else if (body == undefined || body == "") {
      return alert("내용을 입력해주세요.");
    }

    proxy
      .post("board", {
        title: title,
        body: body,
      })
      .then(() => {
        alert("게시글이 저장되었습니다.");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [title, body]);

  return (
    <>
      <Root>
        <BoardActionBar>
          <Button
            variant="contained"
            style={{ height: "70%" }}
            color="success"
            onClick={() => saveBoard()}
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
        <BoardCreateAreaLayout>
          <TextField
            id="outlined-basic"
            label="제목"
            variant="outlined"
            defaultValue=""
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="내용"
            variant="outlined"
            multiline
            defaultValue=""
            onChange={(event) => setBody(event.target.value)}
          />
        </BoardCreateAreaLayout>
      </Root>
    </>
  );
}

const Root = styled.div`
  width: 50%;
`;

const BoardCreateAreaLayout = styled.div`
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
