

export default function Filter({ filter, setFilter }) {
    return (
        <>
            <label className='mr-2' htmlFor='filter'>Filter by name:</label>
            <input className=' my-2' id='filter' value={filter} onChange={(e) => setFilter(e.target.value)} />
        </>
    )
}
