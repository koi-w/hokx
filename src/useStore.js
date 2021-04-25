import React from 'react'
import {warn} from './utils'
import {contexts} from './createStore'

// Recursively find the target value
function getTargetValue(nameSpaceArr, state){
    let currentState = state[nameSpaceArr.shift()]
    if(nameSpaceArr.length){
        return getTargetValue(nameSpaceArr, currentState)
    }
    return currentState
}

/**
 * custom hook useStore
 * External hook function is provided to obtain data
 * attention: React.useContext Cannot return before calling
 */
export default function useStore(nameSpace){
    if(typeof nameSpace !== 'string'){
        warn('Hokx nameSpace expect a String type.')
    }
    // Target data available
    let nameSpaceArr = nameSpace.split('.')

    // Call react hook to get the data context object
    // Catch error when parameter is empty
    // Returns undefined when no value is found
    try {
        var contextObj = React.useContext(contexts[nameSpaceArr.shift()] || '')
    } catch (error) {
        if(!nameSpaceArr){
            warn('The parameter of useStore cannot be empty')        
        }
        throw error     
    }

    // When the context is empty
    // state return null
    // dispatch renturn v => v
    // To avoid errors when components call dispatch => “dispatch is not a function”
    if(!contextObj) {
        return {state: null, dispatch: v => v}
    }else if(nameSpaceArr.length === 0){
        return contextObj
    }else if(nameSpaceArr.length){
        let {state, dispatch} = contextObj
        let targetState = getTargetValue(nameSpaceArr, state)
        return {state: targetState, dispatch}
    }
}