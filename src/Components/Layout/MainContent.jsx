import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Content/HomePage";
import Cards from "../Content/Cards";
import Tables from "../Content/Tables";
import SaaSTables from "../Content/SaaSTable";

function MainContent() {
  return (
    <>
      <main className="py-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/saastables" element={<SaaSTables />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default MainContent;
