import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/global-styles";
import Header from "../components/Header";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../redux/rootReducer";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import styled from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const store = createStore(rootReducer);
  const persistor = persistStore(store);

  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {/* <Header /> */}
          <Root>
            <Component {...pageProps} />
          </Root>
        </PersistGate>
      </Provider>
    </>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  max-height: 100%;
  overflow-y: hidden;
`;
