import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/entry";
import "./index.css";
import Layout from "./components/layout";
import { defineCustomElements } from '@lexmin0412/wc-react';

defineCustomElements()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <Router />
    </Layout>
  </React.StrictMode>
);
