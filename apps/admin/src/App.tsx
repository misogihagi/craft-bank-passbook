import { useState } from "react";
import PrintQueue from "./components/print-queue";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PrintQueue />
    </>
  );
}

export default App;
