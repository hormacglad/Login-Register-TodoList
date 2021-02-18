import React from 'react'

export default function TodoList(props) {
    return (
        <div>

        {props.data.todo_list.map((data) => {
                        return(
                        <li key={data.id} >
                            {props.updateID == data.id && props.data.updateButtonText!=='Update'? ( 
                                <input  id={data.id} value={props.handleinput_update} placeholder = {data.todo_input} onChange={props.handleInputUpdate}/>
                            ) :   <p id={data.id}>{data.todo_input}</p> 
                            }
                            {
                            props.data.updateButtonText !=='Update' && props.updateID==data.id?(
                                <button onClick={props.cancelUpdate} id={data.id}>Cancel</button>
                            ):<button onClick={props.delete} id={data.id}>Delete</button>
                            }
                            <button onClick={props.handleSaveOrUpdate} name={data.todo_input} id={data.id}>{props.updateID==data.id?props.data.updateButtonText:'Update'}</button>
                        </li>
                        )
                    })}
        </div>
    )
}
