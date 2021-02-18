// import { useState } from 'react'
import './dash.css'

import React, { Component } from 'react'
import TodoList from './TodoList'
import axios from 'axios'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            // form: props.form,
            todo_input: '',
            todo_id_input: '',
            handleinput_update: '',
            updateButtonText: 'Update',
            update_id: '',
            todo_list: [],
            delete_id: '',
            updated_value:''
        }
    }

    componentDidMount() {
        this.handleViewTodo()
    }

    handleViewTodo = async () => {
        const userId = localStorage.getItem('userId')
        console.log('addadaad', userId)
        try {
            const data = {
                idUser: userId
            }
            const view = await axios.post('/todoList', data);
            // const view = await axios.get('/viewTodo');
            console.log('%c 🥖 view: ', 'font-size:20px;background-color: #FCA650;color:#fff;', view);
            console.log(view.data);
            this.setState({ ...this.state, todo_list: view.data })
        } catch (e) {
            console.log(e.message)
        }
    }

    // handleLogout = () => {
    //     localStorage.setItem("state", "login");
    //     localStorage.setItem("name", null);
    //     localStorage.setItem("userId", null)
    //     // this.props.changeForm("login");
    //     // this.setState({...this.state, form:"login"})
    //     // this.setState({...this.state, form: "login"})
    //     console.log(this.state.form);
    // }

    handleInputChange = (event) => {
        const { value } = event.target
        this.setState({ todo_id_input: new Date().getTime(), todo_input: value })
    }

    handleAddButton = async () => {
        console.log('Add Button Clicked');
        console.log(localStorage.getItem('userId'));
        const userId  = localStorage.getItem('userId')
        const { todo_id_input, todo_input, todo_list} = this.state
        const todo_data = {
            todo_input,
            userId
        }
        // console.log(todo_input);
       
        try {
            const event = await axios.post('/dashboard', todo_data)
            console.log(event.data.data,"event");
            // const result = await this.handleViewTodo()
            // console.log("resulttttt",result.data);
            
            this.setState({ todo_list: event.data.data, todo_input: '' })
            
            // console.log(event.data.Type, event.data.Message)
        } catch (error) {
            console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
        }
        
        
    }



    handleDeleteButton = async (event) => {
        console.log(event.target);
        const userId = localStorage.getItem('userId')
        console.log(userId,"sdfsfewsfrewf");
        const { id } = event.target
        // const userId  = localStorage.getItem('userId')
        // console.log(id,'wasfsafsfs');
        // console.log(this.state.userId);
        // const event = axios.post('/deleteTodo',id)
        
        try {
            const result = await axios.post('/deleteTodo', { id })
            this.handleViewTodo()
            // const todo_list = await axios.post('/todoList', {userId})
            // console.log(todo_list.data,"ahdkahsdhadahkhsad");
            // this.setState({ todo_list: todo_list.data })

            console.log(result);
            
            // this.handleViewDeleted()
            // const view = await axios.post('/todoList', {userId});
            // const view = await axios.get('/viewTodoDeleted')
            // const view = await axios.post('/todoList', {userId});
            // console.log(view.data,"gladys");
            // this.setState({ ...this.state, todo_list: view.data })
            
        } catch (error) {
            console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
        }
    }

    // handleViewDeleted = async () => {
    //     // const userId = localStorage.getItem('userId')
    //     // console.log('addadaad', userId)
    //     try {
    //     //     const data = {
    //     //         idUser: userId
    //     //     }
    //         const view = await axios.get('/viewTodoDeleted');
    //         // const view = await axios.get('/viewTodo');
    //         console.log('%c 🥖 view: ', 'font-size:20px;background-color: #FCA650;color:#fff;', view);
    //         console.log(view.data);
    //         this.setState({ ...this.state, todo_list: view.data })
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // }

    handleInputUpdate = (event) => {
        const { id, value } = event.target
        console.log('%c 🥧 value: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', value);
        this.setState({ ...this.state, handleinput_update: value })
    }

    handleSaveOrUpdate = async (event) => {
        const { id, todo_input } = event.target
        const { todo_list, handleinput_update} = this.state
        const userId = localStorage.getItem('userId')
        // console.log(event.target.id);
        const buttonType = (event.target.innerHTML);
        // console.log(buttonType);
        const buttonText = buttonType === 'Update' ? 'Save' : 'Update';
        // console.log(buttonText);
        if (buttonType === 'Update') {
            console.log('UPDATING')
            this.setState({ ...this.state, update_id: id, updateButtonText: buttonText, handleinput_update: todo_input })
        } else {
            console.log('SAVING')
            console.log(this.state.handleinput_update);
            // console.log(id);
            // console.log("akldsa", userId);  
            try {
               const result =  await axios.put('/updateTodo', { id, handleinput_update, userId })
               console.log(result.data,'wfghhgfgfggfg');
               this.setState({...this.state, todo_list: result.data})
            } catch (error) {
                console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
            }
            todo_list[todo_list.findIndex(list_todo => list_todo.id == id)].todo_input = handleinput_update;
            this.setState({ ...this.state, update_id: id, updateButtonText: buttonText, todo_list: todo_list })
        }

    }

    handleCancelUpdate = (event) => {
        console.log('CANCELLING')
        this.setState({ ...this.state, updateButtonText: 'Update' })
    }

    render() {
        return (

            <div>
                <button onClick={this.props.handleLogoutButton}>LOGOUT</button>
                <h1>{this.props.user}  </h1>
                <h1>To-Do List </h1>
                <input id="input" value={this.state.todo_input} type="text" onChange={this.handleInputChange} />
                <button onClick={this.handleAddButton}>Add</button>
                {/* <button onClick={this.handleViewTodo}>View</button> */}
                <TodoList
                    data={this.state}
                    delete={this.handleDeleteButton}
                    updateID={this.state.update_id}
                    handleInputUpdate={this.handleInputUpdate}
                    handleSaveOrUpdate={this.handleSaveOrUpdate}
                    remove={this.removeName}
                    setInput={this.setInput}
                    cancelUpdate={this.handleCancelUpdate}
                    userID = {this.state.userId}
                />
            </div>
        )
    }
}
export default Dashboard
