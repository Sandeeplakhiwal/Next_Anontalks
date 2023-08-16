// Importing Sass files

import Sidebar from "@/components/client/layout/sidebar/Sidebar";
import React from "react";
import AppTitle from "../Title/AppTitle";

function Home() {
  return (
    <div className="home_comp">
      <Sidebar />
      <section className="home_section">
        <div>
          <AppTitle />
        </div>
      </section>
    </div>
  );
}

export default Home;
