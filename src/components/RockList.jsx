import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const RockList = ({ rocks, fetchRocks }) => {
    useEffect(() => {
        fetchRocks()
    }, [fetchRocks])

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/rocks/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
                "Content-Type": "application/json"
            }
        })

        await fetchRocks()
    }

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                <div>{rock.name} ({rock.type.label})</div>
                <div>In the collection of {rock.user?.first_name} {rock.user?.last_name}</div>
                <div>
                    <button
                        onClick={() => handleDelete(rock.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                        <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                    </button>
                </div>
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}
