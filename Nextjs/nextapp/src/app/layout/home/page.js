import ProtectedRoutes from "@/component/ProtectedRoutes";
import React from "react";

function page() {
  return (
    <ProtectedRoutes>
      <div>
        <h1> This is Home page Babyyy.. </h1>
      </div>
    </ProtectedRoutes>
  );
}

export default page;
