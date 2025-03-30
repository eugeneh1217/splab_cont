import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Home() {
  const [name, setName] = useState("");
  const [zelleId, setZelleId] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !zelleId) {
      return;
    }

    setUser({
      name,
      zelleId,
      isOwner: true,
    });

    navigate("/upload");
  };

  return (
    <div className="flex flex-col items-center text-3xl font-bold">
      <h1 className="mt-[10%]">Create a Splab!</h1>
      <form
        className="mt-[5%] flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-normal">
          Name:
          <input
            className="border border-gray-300 rounded-md p-2 w-64"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="text-sm font-normal">
          Zelle ID:
          <input
            className="border border-gray-300 rounded-md p-2 w-64"
            type="text"
            value={zelleId}
            onChange={(e) => setZelleId(e.target.value)}
          />
        </label>
        <input
          className="border border-gray-300 rounded-md p-2"
          type="submit"
          value="Submit!"
        />
      </form>
    </div>
  );
}

export default Home;
