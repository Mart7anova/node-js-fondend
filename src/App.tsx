import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

type UsersType = Array<{
    id: number
    name: string
}>

function App() {
    const [users, setUsers] = useState<UsersType>([])

    const getUsers = () => {
        axios.get('http://localhost:7542/users')
            .then(res => setUsers(res.data))
    }

    useEffect(() => {
        getUsers()
    }, [])

    const crateUser = () => {
      axios.post('http://localhost:7542/users')
          .then(() =>  getUsers())
    }

    return (
        <div className="App">
            <button onClick={crateUser}>Create user</button>
            {
                users.map(user => <div key={user.id}>{user.name}</div>)
            }
        </div>
    );
}

export default App;
