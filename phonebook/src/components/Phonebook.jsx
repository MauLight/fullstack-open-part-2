import React from 'react'

export default function Phonebook({ phoneBook, deletePerson }) {
    return (
        <ul className='ml-5'>
            {
                phoneBook.map((elem) => <li key={elem.name}>
                    {`${elem.name} - ${elem.number}`}
                    <button
                        className='p-1 ml-2 hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
                        onClick={() => deletePerson(elem.id, elem.name)}
                    >
                        Delete
                    </button>
                </li>)
            }
        </ul>
    )
}
