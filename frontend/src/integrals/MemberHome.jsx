import React, { useState } from "react";

const MemberHome = () => {
  const [tabOwner, setTabOwner] = useState("John");

  return (
    <div className="flex flex-col items-center text-3xl font-bold">
      <h1 className="mt-[10%]">Welcome to {tabOwner}'s tab</h1>
      <form className="mt-[5%] flex flex-col gap-5">
        <label className="text-sm font-normal">
          Name:
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
          />
        </label>
        <input
          className="border broder-gray-300 round-md p-2"
          type="submit"
          value="Get started!"
        />
      </form>
    </div>
  );
};

export default MemberHome;
