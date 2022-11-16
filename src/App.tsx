import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {User} from './User';


type UsersType = Array<{
    _id: string
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
        axios.post(`http://localhost:7542/users`, {name})
            .then(() => getUsers())
    }

    const changeUserName = (id: string, name: string) => {
        axios.put(`http://localhost:7542/users/${id}`, {name})
            .then(() => getUsers())
    }

    const removeUser = (id: string) => {
        axios.delete(`http://localhost:7542/users/${id}`)
            .then(() => getUsers())
    }

    return (
        <div className="App">
            <h1>Search user</h1>
            <input value={param} onChange={(e) => setParam(e.currentTarget.value)}/>
            <button onClick={searchUser}>Search</button>

            <h1>Create new user</h1>
            <input value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <button onClick={() => crateUser(name)}>Create user</button>

            <div style={{
                width: '25vh',
                display: 'flex',
                flexDirection: 'column-reverse',
                marginTop: '20px'
            }}>
                {
                    users.map(user => <User key={user._id}
                                            id={user._id}
                                            name={user.name}
                                            removeUser={removeUser}
                                            changeUserName={changeUserName}
                    />)
                }
            </div>
        </div>
    );
}

export default App;
