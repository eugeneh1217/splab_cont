import React, { useState } from "react";
import BillItem from "../components/BillItem";
import AvatarCircles from "../components/AvatarCircles";

function TabList() {
  const [checkedItems, setCheckedItems] = useState({});
  const [tip, setTip] = useState("");
  const members = ["Arnav Aggarwal", "Ishani Mehra", "Cheng Li", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta", "Siddharth Gupta"];

  const items = [
    { id: 1, name: "Potatoes", price: 13.5 },
    { id: 2, name: "Fries", price: 9.0 },
    { id: 3, name: "Coffee", price: 4.5 },
    { id: 4, name: "Burger", price: 11.99 },
    { id: 5, name: "Ice Cream", price: 6.0 },
    { id: 6, name: "Pizza", price: 15.0 },
    { id: 7, name: "Salad", price: 7.5 },
    { id: 8, name: "Soda", price: 2.5 },
    { id: 9, name: "Pasta", price: 12.0 },
    { id: 10, name: "Steak", price: 25.0 },
    { id: 11, name: "Fish", price: 18.0 },
    { id: 12, name: "Bread", price: 3.0 },
    { id: 13, name: "Butter", price: 4.0 },
    { id: 14, name: "Cheese", price: 5.0 },
    { id: 15, name: "Chicken", price: 10.0 },
    { id: 16, name: "Rice", price: 8.0 },
    { id: 17, name: "Beans", price: 6.0 },
    { id: 18, name: "Eggs", price: 2.0 },
    { id: 19, name: "Yogurt", price: 3.5 },
    { id: 20, name: "Cereal", price: 4.5 },
    { id: 21, name: "Pancakes", price: 7.0 },
    { id: 22, name: "Waffles", price: 8.0 },
    { id: 23, name: "Donuts", price: 5.0 },
    { id: 24, name: "Muffins", price: 4.0 },
    { id: 25, name: "Cookies", price: 3.0 },
    { id: 26, name: "Brownies", price: 4.5 },
    { id: 27, name: "Cupcakes", price: 5.0 },
    { id: 28, name: "Pie", price: 6.0 },
    { id: 29, name: "Tart", price: 7.0 },
    { id: 30, name: "Pudding", price: 4.0 },
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

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h1 className="m-5 text-lg font-bold">Your Tab</h1>
      <AvatarCircles members={members} />

      <div className="flex-1 overflow-y-auto w-[80%] flex flex-col gap-2 pb-24">
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
