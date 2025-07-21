import React from "react";
import { useNavigate } from "react-router";

import Navbar from "./Navbar";
import MainContent from "./MainContent";
import BottomNavigationBar from "./BottomNavigationBar";
import FloatingActionButton from "./FloatingActionButton";
import "./styles.css";

const Passbook = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-amber-50 font-sans">
      <Navbar />
      <MainContent />
      <FloatingActionButton onclick={() => navigate("new")} />
    </div>
  );
};

export default Passbook;
