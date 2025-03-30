import MemberSplit from "../components/MemberSplit"

function OwnerFinal() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold">Split</h1>
      <div className="w-[80%] border border-gray-300 rounded-md">
        <MemberSplit name="Andy" amount={35.4}/>
        <MemberSplit name="Andy" amount={35.4}/>
        <MemberSplit name="Andy" amount={35.4}/>
        <MemberSplit name="Andy" amount={35.4}/>
      </div>
    </div>
  )
}

export default OwnerFinal;
