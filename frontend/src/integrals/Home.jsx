
function Home() {
  return (
    <div className="flex flex-col items-center text-3xl font-bold">
      <h1 className="mt-[10%]">Create a Splab!</h1>
      <form className="mt-[5%] flex flex-col gap-5">
        <label className="text-sm font-normal">
          Name:
          <input className="border border-gray-300 rounded-md p-2" type="text"/>
        </label>
        <label className="text-sm font-normal">
          Zelle ID:
          <input className="border border-gray-300 rounded-md p-2" name="payment"/>
        </label>
        <input className="border broder-gray-300 round-md p-2" type="submit" value="Submit!"/>
      </form>
    </div>
  )
}

export default Home
