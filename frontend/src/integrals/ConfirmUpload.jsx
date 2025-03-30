import { useState } from "react";

import BillItem from "../components/BillItem";
import { useNavigate } from "react-router-dom";

function ConfirmUpload() {
  const [items, setItems] = useState([{'name': 'potato', 'price': 5}, {'name': 'chicken', 'price': 6}])
  const navigate = useNavigate();

  return (
    <div className="relative h-full flex flex-col items-center">
      <h1 className="m-5 text-lg font-bold">Confirm List</h1>
      <div className="w-[80%] flex flex-col gap-2">
        {items ? (items.map((item, index) => (
            <BillItem key={index} index={index+1} name={item.name} price={item.price} checkboxDisabled/>
          ))) : (
            <h1 className="text-lg font-bold">Items were unable to be recognized... try again!</h1>
          )
        }
      </div>
      <div className="absolute bottom-5 flex flex-row gap-10">
        <button onClick={() => navigate("/upload")} className="px-15 py-3 bg-[var(--primary)] text-white rounded-full shadow transition">Back</button>
        <button onClick={() => navigate("/get-link")} className="px-15 py-3 bg-[var(--primary)] text-white rounded-full shadow transition">Proceed</button>
      </div>
    </div>
  )
}

export default ConfirmUpload;
