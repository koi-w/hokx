## Hokx
A lightweight state management tool for react hook.  
Suitable for functional components.  
## Installation
```shell
$ npm install hokx
$ or
$ yarn add hokx
```
## Employ
New a store directory under src
```
|- src
|--- store
|----- userInfo.js
|----- mineInfo.js
|----- index.js
|- App.js
|- index.js
```
* createStore (src/store/index.js)
```js
import {createStore} from 'hokx'

const userInfo = {
    nameSpace: '',  // Reducer name
    state: {},      // Data
    getter: {},     // Calculation properties
    reducer: {},    // Pure function, modify state
    effects: {}     // Side effect
}
const mineInfo = {
    nameSpace: 'mineInfo',
    state: {
        name: 'hokx',
        age: 18,
        salary: 20
    },
    getter: {
        totalAssets(state){
            return state.age * state.salary
        },
    },
    reducer: {
        setName(state, action){
            state.name = action.name
            return {...state}
        }
    },
    effects: {
        async getData({state,put}, action){
            const { data } = await axios({
                method: 'GET',
                url: '/user.json'
            })
            put({type:'setName', name: data.name})
        }
    }
}
const reducer = [userInfo, mineInfo]
const Provider = createStore(reducer)

export default Provider
```

* mount Provider (src/index.js)  
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Provider from './store'

ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## Use
* useStore
```js
import React from 'react'
import {useStore} from 'hokx'

export default (props) => {

    const {state, dispatch} = useStore(nameSpace)

    let handle = () => {
        dispatch({type: '', data: ''})
    }

    return (
        <div onClick={handle}>{JSON.stringify(state)}</div>
    )
}
```
* useGetter
```js
import {useGetter} from 'hokx'
const getter = useGetter('mineInfo')
console.log(getter.totalAssets)
```

* store (global)  
If you want to use state, or use getter, or execute dispatch not in a component.  
Or in a component, and you just want to execute dispatch but don't want the component rerender.  
Then you can use the global store  
```js
store.[nameSpace]State
store.[nameSpace]Dispatch({type: '', data: ''})
store.[nameSpace]Getter.values
```

* support local storage
* localStorage
* sessionStorage
```js
const reducer = {
    nameSpace: '',
    localStorage: true,
}
or
const reducer = {
    nameSpace: '',
    sessionStorage: true,
}
```

## Employ
[hokx cart demo](https://github.com/koi-w/hokx-cart-demo)