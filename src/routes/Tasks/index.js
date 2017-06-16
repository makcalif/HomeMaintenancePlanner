import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'tasks',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Tasks = require('./containers/TasksContainer').default
      const actions = require('./modules/tasks').actions
      const reducer = require('./modules/tasks').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'tasks', reducer })

      store.dispatch(actions.getTasks()) 

      /*  Return getComponent   */
      cb(null, Tasks)

    /* Webpack named bundle   */
    }, 'Tasks')
  }
})
