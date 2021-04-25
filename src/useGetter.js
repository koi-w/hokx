import React from 'react'
import {warn} from './utils'
import {getters} from './createStore'
import {contexts} from './createStore'
import store from './store'

/**
 * calcGetter
 */
export function calcGetter(R, newState){
    if(R.getter){
        for(const get in R.getter){
            if(R.getter.hasOwnProperty(get)){
                if(get.endsWith('_execFn')) continue;
                let execFn = get + '_execFn'
                if(!R.getter[execFn]){
                    R.getter[execFn] = R.getter[get]
                }
                R.getter[get] = R.getter[execFn](newState || R.state)
                // mount global getter
                const globalGetter = R.nameSpace + 'Getter'
                if(!store[globalGetter]){
                    store[globalGetter] = new Object(null)
                }
                store[globalGetter][get] = R.getter[get]
        　　}
        }
    }
}

/**
 * custom hook useGetter
 * External hook function is provided to obtain calculation data
 */
export default function useGetter(nameSpace){
    if(typeof nameSpace !== 'string'){
        warn('Hokx nameSpace expect a String type.')
    }
    // Trigger component rerender
    const contextObj = React.useContext(contexts[nameSpace] || [])
    if(!contextObj){
        return warn(`Getter not found for "${nameSpace}"`)
    }
    return getters[nameSpace]
}