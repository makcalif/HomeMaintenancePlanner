// ------------------------------------
// Constants
// ------------------------------------
export const GET_TASKS = 'GET_TASKS'  
export const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS'  
// ------------------------------------
// Actions
// ------------------------------------
 
export const getTasks = () => {
  return (dispatch, getState) => {
      console.log('fetch')
      fetch(`api/tasks`) 
      .then( response => response.json())
      .then( json =>  dispatch({
            type    : GET_TASKS,
            payload: {"taskList": json}
          }) 
      ) 
  }
}  

export const addTask = (title, startDate) => {
  return (dispatch, getState) => {
      console.log('fetch startDate :' + startDate)
      fetch(`api/tasks`, {
         headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json'
         },  
         method: "POST",
         body: JSON.stringify({"title": title, "date": startDate})
       }) 
      .then( response => { 
            console.log(response); 
            dispatch(getTasks());
       })
      .then( () => dispatch({
          type: 'ADD_TASK_SUCCESS',
          payload: {}
      }))
       
  }
}

export const deleteTask = (id) => {
  return (dispatch, getState) => {
      console.log('fetch del for:' + id)
      fetch(`api/tasks`, {
         headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json'
         },  
         method: "DELETE",
         body: JSON.stringify({"id": id})
       }) 
      .then( response => {
            console.log('do it');
            console.log(response);

            dispatch(getTasks());
       })
       
  }
} 

export const actions = {
  getTasks,  
  addTask,
  deleteTask 
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = { 
  [GET_TASKS] : (state, action) => {return {...action.payload, title: '', }}, 
  [ADD_TASK_SUCCESS] : (state, action) => { return {...state, startDate: 'reset'} }

  //   [GET_TASKS] : (state, action) => {return Object.assign({}, state, action.payload)},
  // [ADD_TASK_SUCCESS] : (state, action) => { console.log('add task ADD_TASK_SUCCESS'); return Object.assign({}, state, {mk: 'done'}); }
}

// ------------------------------------
// Reducer
// ------------------------------------
//const initialState = {"taskList": [{id: 3, title: 'abc', date: null}]} //{ insurance: {}}
const initialState = {"taskList": []}
export default function tasksReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type] 
  return handler ? handler(state, action) : state
}
