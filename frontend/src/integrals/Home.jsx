import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Home() {
  const [isOwner, setIsOwner] = useState(true);
  const [name, setName] = useState("");
  const [zelleId, setZelleId] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isOwner) {
      if (!name || !zelleId) {
        return;
      }
      setUser({
        name,
        zelleId,
        isOwner: isOwner,
      });
      navigate("/upload");
    } else {
      navigate(`/tab-list?code=${code}`)
    }
  };

  return (
    <div className="flex flex-col items-center text-3xl font-bold">
      {isOwner ? (
        <div>
          <h1 className="mt-[10%]">Create a Splab!</h1>
          <form className="mt-[5%] flex flex-col gap-5" onSubmit={handleSubmit}>
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
            <input className="border broder-gray-300 round-md p-2" type="submit" value="Submit!"/>
          </form>
          <div className="w-full flex flex-col items-center">
            <button className="text-sm font-normal" onClick={() => setIsOwner(false)}>Join a Splab?</button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mt-[10%]">Join a Splab!</h1>
          <form className="mt-[5%] flex flex-col gap-5" onSubmit={handleSubmit}>
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
              Code:
              <input
                className="border border-gray-300 rounded-md p-2 w-64"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
            <input className="border broder-gray-300 round-md p-2" type="submit" value="Submit!"/>
          </form>
          <div className="w-full flex flex-col items-center">
            <button className="text-sm font-normal" onClick={() => setIsOwner(true)}>Create a Splab?</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
