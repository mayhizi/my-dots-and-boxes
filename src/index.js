import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import FireStoreProvider from "./providers/FireStoreProvider";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import Layout from "./components/layout";

ReactDOM.render(
  <FireStoreProvider>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </FireStoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
