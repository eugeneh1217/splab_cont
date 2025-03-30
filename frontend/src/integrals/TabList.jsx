import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BillItem from "../components/BillItem";
import AvatarCircles from "../components/AvatarCircles";

function TabList() {
  let [searchParams, setSearchParams] = useSearchParams();
  let navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState({});
  const [tip, setTip] = useState("");
  const members = [
    "Arnav Aggarwal",
    "Ishani Mehra",
    "Cheng Li",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
    "Siddharth Gupta",
  ];

  const items = [
    { id: 2, name: "Fries", price: 9.0 },
    { id: 3, name: "Coffee", price: 4.5 },
    { id: 4, name: "Burger", price: 11.99 },
    { id: 5, name: "Salad", price: 7.5 },
    { id: 6, name: "Soda", price: 2.5 },
    { id: 7, name: "Pizza", price: 12.99 },
    { id: 8, name: "Pasta", price: 10.0 },
    { id: 9, name: "Dessert", price: 5.5 },
    { id: 10, name: "Ice Cream", price: 3.0 },
    { id: 11, name: "Bread", price: 1.5 },
    { id: 12, name: "Butter", price: 2.0 },
    { id: 13, name: "Cheese", price: 4.0 },
    { id: 14, name: "Eggs", price: 3.5 },
    { id: 15, name: "Chicken", price: 8.0 },
    { id: 16, name: "Fish", price: 9.5 },
    { id: 17, name: "Rice", price: 2.5 },
    { id: 18, name: "Noodles", price: 4.5 },
    { id: 19, name: "Soup", price: 3.0 },
    { id: 20, name: "Steak", price: 15.0 },
    { id: 21, name: "Lamb", price: 20.0 },
    { id: 22, name: "Vegetables", price: 5.0 },
    { id: 23, name: "Fruit", price: 2.0 },
    { id: 24, name: "Snack", price: 1.0 },
    { id: 25, name: "Drink", price: 2.5 },
  ];

  const handleCheckbox = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = () => {
    alert(`Tip: ${tip || 0}, Checked Items: ${JSON.stringify(checkedItems)}`);
  };

  useEffect(() => {
    if (!searchParams.get("code")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-white relative">
      <h1 className="m-5 text-lg font-bold">Your Tab</h1>
      <p className="absolute right-15 top-5">
        Code: {searchParams.get("code")}
      </p>
      <AvatarCircles members={members} />

      <div className="flex-1 overflow-y-auto w-[86%] flex flex-col gap-2 pb-24">
        <BillItem
          index={1}
          price={18.99}
          name="Bill"
          isChecked={!!checkedItems[1]}
          handleCheckbox={() => handleCheckbox(1)}
          checkedBy={["Ishani", "Arnav"]}
        />

        {items.map((item, idx) => (
          <BillItem
            key={item.id}
            index={idx + 1}
            name={item.name}
            price={item.price}
            isChecked={!!checkedItems[item.id]}
            handleCheckbox={() => handleCheckbox(item.id)}
          />
        ))}
      </div>

      <div className="fixed bottom-4 flex gap-2 items-center bg-white p-3 rounded-xl shadow-md">
        <input
          type="number"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
          placeholder="Tip ($)"
          className="border border-gray-300 rounded-md p-2 w-24 text-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default TabList;
