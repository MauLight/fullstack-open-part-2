export const Note = ({ content, id, important, handleImportant }) => {

    const label = important ? 'make not important' : 'make important'

    return (
        <li className='list-none' key={id}>
            {content}
            <button onClick={handleImportant}>{label}</button>
        </li>
    )
}