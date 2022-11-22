import { createGlobalStyle } from "styled-components";
import normalize from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}

    html {
        margin: 0;

    padding: 0;

    min-width: 100%;
    width: 100%;
    max-width: 100%;

    min-height: 100%;
    height: 100%;
    max-height: 100%;
    }
    body {
        position: absolute;
        background-color: #F3F6F9;
        width: 100%;
        /* height: 100%; */
        max-height: 100%;
        min-height: 100%;
        padding-left: 20%;
        padding-right: 20%;
        padding-top: 2%;
        padding-bottom: 5%;
        /* overflow-y: hidden; */

        /* ::-webkit-scrollbar {
            display: none; 
    } */
    }
`;
