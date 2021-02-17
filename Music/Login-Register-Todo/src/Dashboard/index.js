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
            todo_input: '',
            todo_id_input: '',
            handleinput_update: '',
            updateButtonText: 'Update',
            update_id: '',
            todo_list: [],
            delete_id: ''
        }
    }

    componentDidMount() {
        this.handleViewTodo()
    }

    handleViewTodo = async () => {
        console.log('addadaad')
        try {
            const view = await axios.get('/viewTodo');
            console.log('%c 🥖 view: ', 'font-size:20px;background-color: #FCA650;color:#fff;', view);
            console.log(view.data);
            this.setState({ ...this.state, todo_list: view.data })
        } catch (e) {
            console.log(e.message)
        }
    }

    handleLogout = () => {
        localStorage.setItem("state", "login");
        localStorage.setItem("name", null);
        this.props.changeForm("login");
    }

    handleInputChange = (event) => {
        const { value } = event.target
        this.setState({ todo_id_input: new Date().getTime(), todo_input: value })
    }

    handleAddButton = async () => {
        console.log('Add Button Clicked');
        console.log(localStorage.getItem('userId'));
        const userId  = localStorage.getItem('userId')
        const { todo_id_input, todo_input, todo_list} = this.state
        this.setState({ todo_list: [...todo_list, { userId: new Date().getTime(), todo_input: todo_input }], todo_input: '' })
        const todo_data = {
            todo_input,
            userId
        }
        console.log(todo_input);
        try {
            const event = await axios.post('/dashboard', todo_data)
            console.log(event.data.Type, event.data.Message)
        } catch (error) {
            console.log('%c 🥓 error: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', error);
        }
    }



    handleDeleteButton = async (event) => {
        console.log(event.target.id);
        const { id } = event.target
        // console.log(this.state.userId);
        // const event = axios.post('/deleteTodo',id)
        try {
            await axios.post('/deleteTodo', { id })
            this.handleViewTodo()
            //  .then(d => {
            //      console.log('requesting')
            //      return axios.get('/viewTodo')
            //  })
            //  .then(view => {
            //     console.log(view.data);

            //     this.setState({...this.state, todo_list: view.data })
            //  })
            //  .catch(e => {
            //      console.log('ee',e.message)
            //  })

            //console.log(this.handleViewTodo)
            // let view = await axios.get('/viewTodo');
            // console.log(view.data);
            // this.setState({...this.state, todo_list: view.data })
            // console.log(event.data.Type, event.data.Message)
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
        const { todo_list, handleinput_update} = this.state
        const userId = localStorage.getItem('userId')
        console.log(event.target.id);
        const buttonType = (event.target.innerHTML);
        console.log(buttonType);
        const buttonText = buttonType === 'Update' ? 'Save' : 'Update';
        console.log(buttonText);
        if (buttonType === 'Update') {
            console.log('UPDATING')
            this.setState({ ...this.state, update_id: id, updateButtonText: buttonText, handleinput_update: todo_input })
        } else {
            console.log('SAVING')
            console.log(this.state.handleinput_update);  
            try {
               const result =  await axios.put('/updateTodo', { id, handleinput_update, userId })
               console.log(result.data,'wfghhgfgfggfg');
               this.setState({...this.state, todo_list: result.data})
                // this.handleViewTodo()
                //  .then(d => {
                //      console.log('requesting')
                //      return axios.get('/viewTodo')
                //  })
                //  .then(view => {
                //     console.log(view.data);

                //     this.setState({...this.state, todo_list: view.data })
                //  })
                //  .catch(e => {
                //      console.log('ee',e.message)
                //  })
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
                <button onClick={this.handleLogout}>LOGOUT</button>
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
