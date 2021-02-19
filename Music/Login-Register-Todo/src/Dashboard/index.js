import React, { Component } from 'react'
import TodoList from './TodoList'
import axios from 'axios'
import './dash.css'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo_input: '',
            todo_id_input: '',
            handleinput_update: '',
            updateButtonText: 'Update',
            update_id: '',
            todo_list: [],
            delete_id: '',
            updated_value: '',
            error_message:''
        }
    }
    

    componentDidMount() {
        this.handleViewTodo()
    }

    handleViewTodo = async () => {
        const userId = localStorage.getItem('userId')
        try {
            const view = await axios.post('/todoList', { userId });
            this.setState({ ...this.state, todo_list: view.data })
        } catch (e) {
            console.log(e.message)
        }
    }

    handleInputChange = (event) => {
        const { value } = event.target
        this.setState({ todo_id_input: new Date().getTime(), todo_input: value })
    }

    handleAddButton = async () => {
        const userId = localStorage.getItem('userId')
        const { todo_input } = this.state
        const todo_data = {
            todo_input,
            userId
        }
        try {
            if(todo_input!==""){
            const event = await axios.post('/addTodo', todo_data)
            this.setState({ todo_list: event.data.data, todo_input: '' })
            }else{
                // this.setState({error_message:'No task to be added!' })
                console.log('No task to be added!');
                
            }
        } catch (error) {
            console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
        }
    }

    handleDeleteButton = async (event) => {
        const userId = localStorage.getItem('userId')
        const { id } = event.target
        try {
            const result = await axios.post('/deleteTodo', { id })
            this.handleViewTodo()
        } catch (error) {
            console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
        }
    }

    handleInputUpdate = (event) => {
        const { id, value } = event.target
        console.log('%c 🥧 value: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', value);
        this.setState({ ...this.state, handleinput_update: value })
    }

    handleSaveOrUpdate = async (event) => {
        const { id, todo_input } = event.target
        const { todo_list, handleinput_update } = this.state
        const userId = localStorage.getItem('userId')
        const buttonType = (event.target.innerHTML);
        const buttonText = buttonType === 'Update' ? 'Save' : 'Update';
        if (buttonType === 'Update') {
            console.log('UPDATING')
            this.setState({ ...this.state, update_id: id, updateButtonText: buttonText, handleinput_update: todo_input })
        } else {
            console.log('SAVING')
            console.log(this.state.handleinput_update);
            try {
                const result = await axios.put('/updateTodo', { id, handleinput_update, userId })
                this.setState({ ...this.state, todo_list: result.data })
            } catch (error) {
                console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
            }
            todo_list[todo_list.findIndex(list_todo => list_todo.id == id)].todo_input = handleinput_update;
            this.setState({ ...this.state, update_id: id, updateButtonText: buttonText, todo_list: todo_list })
        }

    }
    handleUserWelcome = () =>{
        const user = this.props.user
        return user
        
    }

    handleCancelUpdate = (event) => {
        console.log('CANCELLING')
        this.setState({ ...this.state, updateButtonText: 'Update' })
    }

    render() {
        const {user} = this.props
        const name = user.split('@')

        return (

            <div>
                {/* <div
            class="app-container d-flex align-items-center justify-content-center flex-column"
            ng-app="myApp"
            ng-controller="myController"
            >
    
      <h3>Todo App</h3>
      <div class="d-flex align-items-center mb-3">
        <div class="form-group mr-3 mb-0">
          <input
            ng-model="yourTask"
            type="text"
            class="form-control"
            id="formGroupExampleInput"
            placeholder="Enter a task here"
          />
        </div>
        <button
          type="button"
          class="btn btn-primary mr-3"
          ng-click="saveTask()"
        >
          Save
        </button>
        <button type="button" class="btn btn-warning">
        </button>
      </div> */}
                <button onClick={this.props.handleLogoutButton}>LOGOUT</button>
                <h1>{name[0].toUpperCase()}  </h1>
                {/* <h1>{()=>this.handleUserWelcome}</h1> */}
                {/* <h1>To-Do List </h1> */}
                {/* <input id="input" value={this.state.todo_input} type="text" onChange={this.handleInputChange} /> */}
                {/* <div class="form-group mr-3 mb-0">
                    <input type="text" class="form-control" id="input" placeholder="Enter a task here" onChange={this.handleInputChange} />
                </div>
                <button type="button" class="btn btn-primary mr-3" onClick={this.handleAddButton}>Add</button> */}
                <TodoList
                    data={this.state}
                    delete={this.handleDeleteButton}
                    handleAddButton = {this.handleAddButton}
                    handleInputChange = {this.handleInputChange}
                    updateID={this.state.update_id}
                    handleInputUpdate={this.handleInputUpdate}
                    handleSaveOrUpdate={this.handleSaveOrUpdate}
                    remove={this.removeName}
                    setInput={this.setInput}
                    cancelUpdate={this.handleCancelUpdate}
                    userID={this.state.userId}
                />
            </div>
        )
    }
}
export default Dashboard
