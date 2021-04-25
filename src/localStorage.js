import {getLocalStorage,
        setLocalStorage,
        removeLocalStorage,
        getSessionStorage,
        setSessionStorage,
        removeSessionStorage} from './utils'

// set local state
export const localStorageJudge = (R) => {
    if(R.sessionStorage === true){
        let _sessionStorage = getSessionStorage(R.nameSpace)
        if(_sessionStorage){
            R.state = JSON.parse(_sessionStorage)
        }else{
            setSessionStorage(R.nameSpace, R.state)
        }
    }else{
        removeSessionStorage(R.nameSpace)
    }
    if(R.localStorage === true){
        let _localStorage = getLocalStorage(R.nameSpace)
        if(_localStorage){
            R.state = JSON.parse(_localStorage)
        }else{
            setLocalStorage(R.nameSpace, R.state)
        }
    }else{
        removeLocalStorage(R.nameSpace)
    }
}

// set local state after execute reducer function
export const setLocalStateAfterReducer = (R, updatedState) => {
    if(R.localStorage === true){
        setLocalStorage(R.nameSpace, updatedState)
    }
    if(R.sessionStorage === true){
        setSessionStorage(R.nameSpace, updatedState)
    }
}