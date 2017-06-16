import React from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateFormat'

const TasksList = ({tasks, deleteTask}) =>   
  (
  <div className="task-list-container">
  	<ul>
  	{tasks.map(task =>  
           <div className="task-cell-container" key={task.id}>
           	
           	<div className={"task-cell title " + (task.upcoming ? 'upcoming': 'past')  }>{task.title}</div>
           
           	<div className={"task-cell date " + (task.upcoming ? 'upcoming': 'past')  }>{dateFormat(task.date, "fullDate")}</div> 
             
           	<div className='task-cell delete'><button onClick={ ( ) =>  deleteTask( task.id ) }> delete </button></div>
           </div>
      )}
      </ul>
    </div>
  ) 

TasksList.propTypes = {
  tasks: PropTypes.array,
  deleteTask: PropTypes.func.isRequired
}

export default TasksList