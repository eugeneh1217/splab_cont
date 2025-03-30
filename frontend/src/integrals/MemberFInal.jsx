import React from "react";

const MemberFinal = () => {
  const [amount, setAmount] = React.useState(24.99); 
  const [zelleId, setZelleId] = React.useState("johndoe@email.com");

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 bg-gray-100">
      <div className="text-center mb-8">
        <p className="text-lg">
          Please transfer your share to
        </p>
        <div className="mt-2 bg-white shadow-md p-4 rounded-xl text-gray-800 text-sm">
          {zelleId}
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg">You owe:</p>
        <p className="text-4xl font-bold text-green-600 mt-2">${amount.toFixed(2)}</p>
      </div>

      <button
        onClick={() => alert("Thank you!")}
        className="mt-10 px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition"
      >
        Done
      </button>
    </div>
  );
};

export default MemberFinal;
