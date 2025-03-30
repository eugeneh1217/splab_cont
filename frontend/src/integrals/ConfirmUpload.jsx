import { useState } from "react";

import BillItem from "../components/BillItem";

function ConfirmUpload() {
  const [items, setItems] = useState([{'name': 'potato', 'price': 5}, {'name': 'chicken', 'price': 6}])

  return (
    <div className="relative h-full flex flex-col items-center">
      <h1 className="m-5 text-lg font-bold">Confirm List</h1>
      <div className="w-[80%]">
        {items ? (items.map((item, index) => (
            <BillItem key={index} index={index+1} name={item.name} price={item.price}/>
          ))) : (
            <h1 className="text-lg font-bold">Items were unable to be recognized... try again!</h1>
          )
        }
      </div>
      <div className="absolute bottom-5 flex flex-row gap-20">
        <button className="m-4 px-10 border border-gray-300 rounded-md">Back</button>
        <button className="m-4 px-10 border border-gray-300 rounded-md">Proceed</button>
      </div>
    </div>
  )
}

export default ConfirmUpload;
