import React, { type ComponentProps } from "react";
import PrintQueue from "./components/print-queue";
import Document from "./components/document";

function App() {
  const query=window.localStorage.data
  const decodeData = (query: string): ComponentProps<typeof Document> => {
    console.log({
      transactions: JSON.parse(decodeURIComponent(atob(query))),
    });
    return  JSON.parse(decodeURIComponent(atob(query)))
  };

  return (
    <>
      {window.localStorage.data ? (
        <Document transactions={decodeData(window.localStorage.data as string)} />
      ) : (
        <PrintQueue />
      )}
    </>
  );
}

export default App;
