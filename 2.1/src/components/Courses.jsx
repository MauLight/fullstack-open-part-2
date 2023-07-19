import { courses } from "../utils"

const Total = ({ elems }) => {

    const aux = 0
    const sum = elems.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, aux)

    return <p className="pl-5">The number of exercises is {sum}</p>


}

const Content = ({ info }) => {

    return (
        <>
            {
                info.map((elem) => (
                    <div className="my-2" key={elem.id}>
                        <h4 className="text-3xl mb-2">{elem.name}</h4>
                        <ul className="pl-5">
                            {
                                elem.parts.map((part) => <li key={part.id}>{`${part.name} ${part.exercises}`}</li>)
                            }
                        </ul>
                        <Total elems={elem.parts} />
                    </div>
                ))
            }
        </>
    )
}


export default function Courses() {

    return (
        <div>
            <Content info={courses} />
        </div>
    )
}
