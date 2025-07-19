import React from "react";

import Navbar from "./Navbar";
import MainContent from "./MainContent";
import BottomNavigationBar from "./BottomNavigationBar";
import FloatingActionButton from "./FloatingActionButton";
import "./styles.css";
import "../globals.css";

const Passbook = () => {
  return (
    <div className="bg-amber-50 font-sans">
      <Navbar />
      <MainContent />s
      <BottomNavigationBar />
      <FloatingActionButton />
    </div>
  );
};

export default Passbook;
