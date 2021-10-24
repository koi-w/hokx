---
theme: mk-cute
highlight: ascetic
---
* 一个轻量级的react状态管理工具
* 适用于函数式组件
* 基于react hook API useContext、useReducer实现

**结构**  
|- src  
|--- store  
|----- userInfo.js  
|----- mineInfo.js  
|----- index.js  
|- App.js  
```
const userInfo = {
    nameSpace: '',  // 名称
    state: {},      // 数据
    getter: {},     // 计算属性（相当于vuex getters）
    reducer: {},    // 纯函数修改状态（相当于redux reducer，vuex mutations）
    effects: {}     // 副作用异步器（相当于redux、vuex actions）
}
```
**创建 -- createStore**
```
/**
 * 在src/store/index.js 中创建store
 * 导出 Provider 状态树
 */
import {createStore} from 'hokx'

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
const reducer = [mineInfo]
const Provider = createStore(reducer)

export default Provider
```
**注入 -- Provider**
```
import Provider from './store'

ReactDOM.render(
    <Provider>
      <App />
    </Provider>,
    document.getElementById('root')
);
```
**使用 -- useStore**
```
/**
 * 通过钩子useStore获取store中存储的数据
 * @param {nameSpace} 名称
 * 解构出state，dispatch
 * state 为 data 中数据
 * dispatch 可调用 reducer、effects 中方法
 */
 
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
**计算属性 -- useGetter**
```
/**
 * 通过钩子useGetter获取store中计算属性
 * @param {nameSpace} 名称
 * @return 返回store中getter
 */
 
import {useGetter} from 'hokx'

const getter = useGetter('mineInfo')
console.log(getter.totalAssets)
```
**全局 -- store**
```
/**
 * 如果你想要不在一个组件里使用state，getter，dispatch
 * 或者在一个组件里仅仅想去执行dispatch，而不想让该组件rerender
 * 那么可使用全局store
 */
 
import store from 'hokx'

store.[nameSpace]State
store.[nameSpace]Dispatch({type: '', data: ''})
store.[nameSpace]Getter.values

例：
store.userInfoState.name
store.userInfoDispatch()
store.userInfoGetter.totalAssets
```
**本地存储 -- localStorage / sessionStorage**
```
const reducer = {
    nameSpace: '',
    localStorage: true, // 开启当前state状态 本地localStorage存储
}
or
const reducer = {
    nameSpace: '',
    sessionStorage: true, // 开启当前state状态 本地sessionStorage存储
}
```
npm地址：[hokx](https://www.npmjs.com/package/hokx)  
源码地址：[github](https://github.com/koi-w/hokx)  
demo地址：[购物车](http://39.108.236.165:3002/)  
demo源码地址：[购物车 github](https://github.com/koi-w/hokx-cart-demo)


