import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const MemberHome = () => {
  const [tabOwner, setTabOwner] = useState("John");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      return;
    }

    setUser({
      name,
      isOwner: false,
    });

    navigate("/tab-list?code=abc123");
  }

  return (
    <div className="flex flex-col items-center text-3xl font-bold">
      <h1 className="mt-[10%]">Welcome to {tabOwner}'s tab</h1>
      <form className="mt-[5%] flex flex-col gap-5" onSubmit={handleSubmit}>
        <label className="text-sm font-normal">
          Name:
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
