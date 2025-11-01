
import {Client} from '../types/types'

function ClientCard({name, country, email}: Client) {
    // const client{
    //     name = "Shemsa",
    //     country = "Rwanda",
    //     email = "patienceshemssa@gmail.com"
    // }
  return (
    <div>
        <div className="p-4 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600 mb-1">Country: {country}</p>
            {email && <p className="text-gray-600">Email: {email}</p>}
        </div>
    </div>
  )
}

export default ClientCard