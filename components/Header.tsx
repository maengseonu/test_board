import styled from "styled-components";

export default function Header() {
  return (
    <>
      <HeaderLayout>
        <WebNameLayout>Stock Predictor</WebNameLayout>
      </HeaderLayout>
    </>
  );
}

const HeaderLayout = styled.div`
  width: 50%;
  height: 70px;
  display: flex;
  /* border-bottom: 1px solid #ebebeb; */
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px -1px,
    rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: rgb(25, 118, 210);
  color: rgb(255, 255, 255);
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms,
    margin 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
`;

const WebNameLayout = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;

  font-size: 25px;
  font-weight: 300;
`;
