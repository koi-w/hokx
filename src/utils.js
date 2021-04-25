// warn
export const warn = (msg) => {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
        return console.error(`[Hokx warn]: ${msg}`)
    }
    try {
        throw new Error(`[Hokx warn]: ${msg}` )
    } catch (e) {}
}

// isArray
export const isArray = (obj) => {
    if (typeof Array.isArray === "function") {
        return Array.isArray(obj);
    } else {
        return Object.prototype.toString.call(obj) === "[object Array]";
    }
}

// localStorage
export const setLocalStorage = (nameSpace, state) => {
    window.localStorage.setItem(nameSpace, JSON.stringify(state))
}

export const removeLocalStorage = (nameSpace) => {
    window.localStorage.removeItem(nameSpace)
}

export const getLocalStorage = (nameSpace) => {
    return window.localStorage.getItem(nameSpace)
}

// SessionStorage
export const setSessionStorage = (nameSpace, state) => {
    window.sessionStorage.setItem(nameSpace, JSON.stringify(state))
}

export const removeSessionStorage = (nameSpace) => {
    window.sessionStorage.removeItem(nameSpace)
}

export const getSessionStorage = (nameSpace) => {
    return window.sessionStorage.getItem(nameSpace)
}