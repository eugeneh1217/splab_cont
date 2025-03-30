
function BillItem({index, name, price, isChecked, handleCheckbox}) {
  return (
    <div className="flex flex-row items-center relative w-full h-15 border border-gray-300 rounded-md">
      <p className="ml-2 mr-5 text-sm font-bold">{index}.</p>
      <p className="text-sm">{name}</p>
      <p className="absolute right-20 font-bold">${price}</p>
      <input className="absolute right-5" type="checkbox" checked={isChecked} onChange={(e) => handleCheckbox(e.target.value)}/>
    </div>
  )
}

export default BillItem;
