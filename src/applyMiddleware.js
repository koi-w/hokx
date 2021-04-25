import {warn} from './utils'
/**
 * Middleware (with side effects)
 * If there is a effects method, it returns the call and passes action、state、dispatch
 * Otherwise, continue to dispatch and end the middleware
 */
export default function applyMiddleware(action, {state,dispatch}, effects){
    if(action.type === undefined){
        return warn('The dispatch parameter requires a "type" attribute')
    }
    let _type = action.type
    if(effects && effects[_type]){
        effects[_type]({state, put: dispatch}, action)
    }else{
        dispatch(action)
    }
}