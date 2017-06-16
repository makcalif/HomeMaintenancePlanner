import React from 'react'
import PropTypes from 'prop-types'
import TasksList from './TasksList' 

import 'react-date-picker/index.css'

import { DateField,  Calendar } from 'react-date-picker'
 
  
class TasksMain extends React.Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
    taskAdded:   PropTypes.object,
    addTask: PropTypes.func.isRequired,
    deleteTask : PropTypes.func.isRequired
  }

  
  constructor(props) {
    super(props);
    this.state = {title: ''}; 

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
         console.log('xxxx')
         this.setState({title: nextProps.title, startDate: nextProps.startDate});

         // inherent problem with date field component. Doesn't let clear it's value by setting state only
         if(nextProps.startDate == 'reset') { 
            this.refs.taskDate.state.value = '';
         }
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  } 

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  // shouldComponentUpdate () {
  //   return false
  // } 

  render () { 
    return (
      <div style={{ margin: '0 auto' }} >
        <div className="task-container"> 
          <input type="text" className="form-control task-title"  value={this.state.title} onChange={this.handleTitleChange} />
          
          <DateField
            className="task-date"
            dateFormat="YYYY-MM-DD"
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            ref="taskDate"
          />
          <button onClick={ ( ) =>  this.props.addTask( this.state.title, this.state.startDate) }> Create </button>
        </div>
        
        {<div> <TasksList tasks={this.props.tasks.taskList} deleteTask={this.props.deleteTask}/></div>} 
        
      </div>
    )
  }
}

export default TasksMain