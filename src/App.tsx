import React, {useEffect, useState} from 'react';
import axios from 'axios';

type UsersType = Array<{
    id: string
    name: string
}>

function App() {
    const [users, setUsers] = useState<UsersType>([])
    const [name, setName] = useState('')
    const [param, setParam] = useState('')

    const getUsers = (param: string = '') => {
        axios.get(`http://localhost:7542/users?search=${param}`)
            .then(res => setUsers(res.data))
    }

    const searchUser = () => {
        getUsers(param)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const crateUser = (name: string) => {
      axios.post('http://localhost:7542/users', {name})
          .then(() =>  getUsers())
    }

    return (
        <div className="App">
            <h1>Search user</h1>
            <input value={param} onChange={(e)=>setParam(e.currentTarget.value)}/>
            <button onClick={searchUser}>Search</button>

            <h1>Create new user</h1>
            <input value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
            <button onClick={()=>crateUser(name)}>Create user</button>

            {
                users.map(user => <div key={user.id}>{user.name}</div>)
            }
        </div>
    );
}

export default App;
