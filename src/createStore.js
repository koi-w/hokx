import React, {Fragment} from 'react'
import {warn, isArray} from './utils'
import conversionReducer from './conversionReducer'
import applyMiddleware from './applyMiddleware'
import store from './store'
import {localStorageJudge, setLocalStateAfterReducer} from './localStorage'
import {calcGetter} from './useGetter'

let Provider = Fragment
let providers = new Array(0)
let contexts = new Object(null)
let getters = new Object(null)

// Function decorator
Function.prototype.hokxFnAfter = function(afterfnArr){
    let self = this
    return function () {
        let result = self.apply(this, arguments)
        afterfnArr.forEach(afterfn => afterfn.apply(this, [result, ...arguments]))
        return result
    }
}

function initContextStateAndDispatch(Context, R){
    // Conversion reducer
    const _reducer = conversionReducer(R.reducer)
    // Decorate "setLocalStateAfterReducer" and "calcGetter" function to _reducer
    const higher_reducer = _reducer.hokxFnAfter([
        setLocalStateAfterReducer.bind(this, R),
        calcGetter.bind(this, R)
    ])
    return (props) => {
        // Use react hook "useReducer" load reducer and state
        const [state, dispatch] = React.useReducer(higher_reducer, R.state);
        // Let dispatch support Middleware
        const enhancedDispatch = action => applyMiddleware(action,{state,dispatch},R.effects)
        // mount global state and dispatch
        const globalState = R.nameSpace + 'State'
        const globalDispatch = R.nameSpace + 'Dispatch'
        store[globalState] = state
        store[globalDispatch] = enhancedDispatch
        return (
            <Context.Provider value={{ state, dispatch: enhancedDispatch }}>
                {props.children}
            </Context.Provider>
        )
    }
}

function resolveReducer(reducer){
    reducer.forEach(R => {
        if(!R.nameSpace){
            warn('The reducer must contain the property "nameSpace"')
        }
        // else if(contexts[R.nameSpace]){
        //     warn('The current namespace already exists')
        // }
        // Local storage judge
        localStorageJudge(R)
        // Initial calculation getter
        calcGetter(R)
        // Create react context
        const Context = React.createContext()
        // Handle reducer. then endow context state and dispatch
        // Generate privider component with data 
        const privider = initContextStateAndDispatch(Context, R)
        // Combine into an array
        providers.push(privider)
        // Combine context use in useStore
        contexts[R.nameSpace] = Context
        // Combine getters use in useGetter
        getters[R.nameSpace] = R.getter
    })
}

// Combine providers
function CombineProviders(){
    Provider = (props) => (
        providers.reduce((provider, ProvidersComposer) => (
            <ProvidersComposer>{provider}</ProvidersComposer>
        ), props.children)
    )
}

export {contexts, getters}
export default function createStore(reducers){
    if(!isArray(reducers)){
        return warn('Hokx reducers expect an Array type.')
    }
    if(!reducers.length) return;
    /**
     * Handle reducers
     * Generate providers array and contexts
     */
    resolveReducer(reducers)
    /**
     * Merge providers
     * Generate Provider component
     */
    CombineProviders()
    return Provider
}