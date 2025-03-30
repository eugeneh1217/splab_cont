import BillItem from "../components/BillItem";

function TabList() {
  return (
    <div className="relative flex flex-col h-full items-center">
      <h1 className="m-5 text-lg font-bold">Bill</h1>
      <div className="w-[80%] flex flex-col gap-1">
        <BillItem index={1} name="potatos" price={13.5} checked={false}/>      
        <BillItem index={2} name="potatos" price={13.5} checked={false}/>      
        <BillItem index={3} name="potatos" price={13.5} checked={false}/>      
        <BillItem index={4} name="potatos" price={13.5} checked={false}/>      
        <BillItem index={5} name="potatos" price={13.5} checked={false}/>      
      </div>
      <div className="absolute bottom-5 flex flex-row">
        <button className="w-30 border border-gray-300 p-2 rounded-md">Submit</button>
      </div>
    </div>
  )
}

export default TabList;
