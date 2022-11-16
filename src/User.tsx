import React, {useState} from 'react';

type PropsType = {
    id: string
    name: string
    removeUser: (id: string) => void
    changeUserName: (id: string, name: string) => void
}

export const User = ({id, name, removeUser, changeUserName}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(name)

    const changeName = (code: string) => {
        if(code === 'Enter'){
            changeUserName(id, value)
            setEditMode(false)
        }
    }

    return (
        <div style={{
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            {
                editMode
                    ? <input value={value}
                             onChange={(e)=>setValue(e.currentTarget.value)}
                             onKeyDown={(e)=>changeName(e.code)}
                    />
                    : <div>{name}
                        <span onClick={() => setEditMode(!editMode)}>🖉</span>
                    </div>
            }
            <div>
                <button onClick={() => removeUser(id)} disabled={editMode}>X</button>
            </div>
        </div>
    );
};