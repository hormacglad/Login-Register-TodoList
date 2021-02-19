import React from 'react'
import './todolist.css'
export default function TodoList(props) {
    return (

        <div className="div_style">
            <div
                class="app-container d-flex align-items-center justify-content-center flex-column"
                ng-app="myApp"
                ng-controller="myController">

                <h3>Todo App</h3>
                <div  class="d-flex align-items-center mb-3">
                    <div class="form-group mr-3 mb-0">
                    <input type="text" class="form-control" value={props.data.todo_input} id="input" placeholder="Enter a task here" onChange={props.handleInputChange} />
                    </div>
                    <button type="button" class="btn btn-primary mr-3" onClick={props.handleAddButton}>Add</button>
                    {/* <button type="button" class="btn btn-warning"> */}
                    {/* </button> */}
                </div>

                <div class="table-wrapper" style={{"overflow":"hidden"}}>
                    <table class="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Todo item</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.data.todo_list.map((data) => {

                                return (

                                    <tr key={data.id}>
                                        <td>{props.updateID == data.id && props.data.updateButtonText !== 'Update' ? (
                                            <input id={data.id} value={props.handleinput_update} placeholder={data.todo_input} onChange={props.handleInputUpdate} />
                                        ) : <p id={data.id}>{data.todo_input}</p>
                                        }</td>

                                        <td>
                                            {
                                                props.data.updateButtonText !== 'Update' && props.updateID == data.id ? (
                                                    <button class="btn btn-danger" onClick={props.cancelUpdate} id={data.id}>Cancel</button>
                                                ) : <button class="btn btn-danger" onClick={props.delete} id={data.id}>Delete</button>
                                            }
                                            <button class="btn btn-success" onClick={props.handleSaveOrUpdate} name={data.todo_input} id={data.id}>{props.updateID == data.id ? props.data.updateButtonText : 'Update'}</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
  // <div key={data.id} >
                            // {props.updateID == data.id && props.data.updateButtonText!=='Update'? ( 
                            //     <input  id={data.id} value={props.handleinput_update} placeholder = {data.todo_input} onChange={props.handleInputUpdate}/>
                            // ) :   <p id={data.id}>{data.todo_input}</p> 
                            // }


                        //     {
                        //     props.data.updateButtonText !=='Update' && props.updateID==data.id?(
                        //         <button onClick={props.cancelUpdate} id={data.id}>Cancel</button>
                        //     ):<button onClick={props.delete} id={data.id}>Delete</button>
                        //     }

                        //     <button onClick={props.handleSaveOrUpdate} name={data.todo_input} id={data.id}>{props.updateID==data.id?props.data.updateButtonText:'Update'}</button>
                        // </div>