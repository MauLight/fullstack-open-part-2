

export default function Form({handleSubmit, newName, setNewName, newNumber, setNewNumber}) {
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-x-2'>
                <div>
                    <label className='mr-2' htmlFor='name'>Name:</label>
                    <input id='name' value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div>
                    <label className='mr-2' htmlFor='number'>Number:</label>
                    <input id='number' value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
                </div>
                <div>
                    <button className='hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3] px-10' type="submit">add</button>
                </div>
            </div>
        </form>
    )
}
