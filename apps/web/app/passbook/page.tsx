import React from "react";

import Navbar from "./Navbar";
import MainContent from "./MainContent";
import FloatingActionButton from "./FloatingActionButton";
import "./styles.css";
import "../globals.css";

const Passbook = () => {
  return (
    <div className="bg-amber-50 font-sans">
      <Navbar />
      <MainContent />
      <FloatingActionButton />
    </div>
  );
};

export default Passbook;
