import React from "react";

import Navbar from "./Navbar";
import MainContent from "./MainContent";
import BottomNavigationBar from "./BottomNavigationBar";
import FloatingActionButton from "./FloatingActionButton";
import "./styles.css";

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
