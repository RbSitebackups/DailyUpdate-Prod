import React, { useContext, useReducer } from 'react'
import reducers from './reducers'
import axios from 'axios'

import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_CATEGORY_BEGIN,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_ERROR,
    GET_CATEGORY_BEGIN,
    GET_CATEGORY_SUCCESS,
    SET_EDIT_CATEGORY,
    DELETE_CATEGORY_BEGIN,
    EDIT_CATEGORY_BEGIN,
    EDIT_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR,
    EDIT_CLIENT_BEGIN,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_ERROR,
    GET_CLIENT_BEGIN,
    GET_CLIENT_SUCCESS,
    SET_EDIT_CLIENT,
    DELETE_CLIENT_BEGIN,
    CREATE_CLIENT_BEGIN,
    CREATE_CLIENT_SUCCESS,
    CREATE_CLIENT_ERROR,
    GET_USERLIST_BEGIN,
    GET_USERLIST_SUCCESS,
    SET_USER_CLIENT,
    CREATE_USER_CLIENT_BEGIN,
    CREATE_USER_CLIENT_SUCCESS,
    CREATE_USER_CLIENT_ERROR,
    GET_USER_CLIENT_BEGIN,
    GET_USER_CLIENT_SUCCESS,
    DELETE_USER_CLIENT_BEGIN,
    GET_PROGRESS_CATEGORY_BEGIN,
    GET_PROGRESS_CATEGORY_SUCCESS,
    FETCH_PROGRESS_BEGIN,
    FETCH_PROGRESS_SUCCESS,
    CREATE_ADD_PROGRESS_BEGIN,
    CREATE_ADD_PROGRESS_SUCCESS,
    CREATE_ADD_PROGRESS_ERROR,
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const ClientID = sessionStorage.getItem('ClientID')
const ClientName = sessionStorage.getItem('ClientName')
const _selectedClient = { ClientID, ClientName }

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertTitle: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    isEditing: false,
    category_name: '',
    category: [],
    totalCategories: 0,
    numOfPages: 1,
    page: 1,
    isFormActive: false,
    client_name: '',
    client_initials: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    client: [],
    rows: [],
    userlist: [],
    totalClients: 0,
    totalRows: 0,
    selectedClient: _selectedClient ? _selectedClient : null,
    client_id: '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducers, initialState)

    // AXIOS
    const authFetch = axios.create({
        baseURL: '/api/v1',
    })

    //REQUEST
    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    //RESPONSE
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error.response)
            if (
                error.response.status === 401 ||
                error.response.status === 500
            ) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    const removeUserToLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(
                `api/v1/auth/${endPoint}`,
                currentUser
            )
            const { user, token } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, alertText },
            })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const setupGoogleUser = async ({ currentUser, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post('api/v1/auth/glogin', currentUser)
            const { user, token } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, alertText },
            })

            addUserToLocalStorage({ user, token })
        } catch (error) {
            const { data } = await axios.post(
                'api/v1/auth/gregister',
                currentUser
            )
            const { user, token } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, alertText },
            })
            // dispatch({
            //     type: SETUP_USER_ERROR,
            //     payload: { msg: error.response.data.msg },
            // })
        }
        clearAlert()
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserToLocalStorage()
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch(
                '/auth/updateUser',
                currentUser
            )
            const { user, token } = data
            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            if (error.response.status !== 401 || error.response.status !== 500)
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
        }
        clearAlert()
    }

    const getUserlist = async () => {
        let url = `/auth/listuser`
        dispatch({ type: GET_USERLIST_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { userlist } = data
            dispatch({
                type: GET_USERLIST_SUCCESS,
                payload: { userlist },
            })
        } catch (error) {
            // logoutUser()
            console.log(error)
        }
        clearAlert()
    }

    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    /* ################# CATEGORY ################### */
    const createCategory = async () => {
        dispatch({ type: CREATE_CATEGORY_BEGIN })
        try {
            const { category_name } = state
            await authFetch.post('/cate', {
                category_name,
            })
            dispatch({ type: CREATE_CATEGORY_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_CATEGORY_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const getCategories = async () => {
        let url = `/cate`
        dispatch({ type: GET_CATEGORY_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { category, totalCategories, numOfPages } = data
            dispatch({
                type: GET_CATEGORY_SUCCESS,
                payload: { category, totalCategories, numOfPages },
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const setEditCategory = (id) => {
        dispatch({ type: SET_EDIT_CATEGORY, payload: { id } })
        // console.log(`Set edit category : ${id}`)
    }
    const editCategory = async () => {
        dispatch({ type: EDIT_CATEGORY_BEGIN })
        try {
            const { category_name } = state
            await authFetch.patch(`/cate/${state.editCategoryID}`, {
                category_name,
            })
            dispatch({ type: EDIT_CATEGORY_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_CATEGORY_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
    }

    const delCategory = async (id) => {
        dispatch({ type: DELETE_CATEGORY_BEGIN })
        try {
            await authFetch.delete(`/cate/${id}`)
            getCategories()
        } catch (error) {
            console.log(error.response)
        }

        console.log(`Set archive category : ${id}`)
    }

    /* ################# CATEGORY END ################### */

    /* ################# CLIENT ################### */
    const createClient = async () => {
        dispatch({ type: CREATE_CLIENT_BEGIN })
        try {
            const {
                client_name,
                client_initials,
                contact_name,
                contact_email,
                contact_phone,
            } = state
            await authFetch.post('/client', {
                client_name,
                client_initials,
                contact_name,
                contact_email,
                contact_phone,
            })
            dispatch({ type: CREATE_CLIENT_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_CLIENT_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const getClients = async () => {
        let url = `/client`
        dispatch({ type: GET_CLIENT_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { client, totalClients, numOfPages } = data
            dispatch({
                type: GET_CLIENT_SUCCESS,
                payload: { client, totalClients, numOfPages },
            })
        } catch (error) {
            logoutUser()
        }
        clearAlert()
    }

    const setEditClient = (id) => {
        dispatch({ type: SET_EDIT_CLIENT, payload: { id } })
        // console.log(`Set edit category : ${id}`)
    }
    const editClient = async () => {
        dispatch({ type: EDIT_CLIENT_BEGIN })
        try {
            const {
                client_name,
                client_initials,
                contact_name,
                contact_email,
                contact_phone,
            } = state
            await authFetch.patch(`/client/${state.editClientID}`, {
                client_name,
                client_initials,
                contact_name,
                contact_email,
                contact_phone,
            })
            dispatch({ type: EDIT_CLIENT_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_CLIENT_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
    }

    const delClient = async (id) => {
        dispatch({ type: DELETE_CLIENT_BEGIN })
        try {
            await authFetch.delete(`/client/${id}`)
            getClients()
        } catch (error) {
            console.log(error.response)
        }

        console.log(`Set archive category : ${id}`)
    }

    const setSelectedClient = (ClientID, ClientName) => {
        sessionStorage.setItem('ClientID', ClientID)
        sessionStorage.setItem('ClientName', ClientName)
        dispatch({ type: SET_USER_CLIENT, payload: { ClientID, ClientName } })
        // console.log(`Set edit category : ${id}`)
    }

    /* ################# CATEGORY END ################### */

    /* ################# USER CLIENT START ################### */

    const createUserClient = async () => {
        const client_id = sessionStorage.getItem('ClientID')
        dispatch({ type: CREATE_USER_CLIENT_BEGIN })
        try {
            const { assigned_id } = state
            await authFetch.post('/userclient', {
                client_id,
                assigned_id,
            })
            dispatch({ type: CREATE_USER_CLIENT_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_USER_CLIENT_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    const getUserClient = async () => {
        const cilent_id = sessionStorage.getItem('ClientID')

        dispatch({ type: GET_USER_CLIENT_BEGIN })
        try {
            const { data } = await authFetch.get(`/userclient/${cilent_id}`)
            const { rows, totalRows, numOfPages } = data
            console.log(data.rows)
            dispatch({
                type: GET_USER_CLIENT_SUCCESS,
                payload: { rows, totalRows, numOfPages },
            })
        } catch (error) {
            // logoutUser()
        }
        clearAlert()
    }

    const delUserClient = async (id) => {
        dispatch({ type: DELETE_USER_CLIENT_BEGIN })
        try {
            await authFetch.delete(`/userclient/${id}`)
            getUserClient()
        } catch (error) {
            console.log(error.response)
        }
    }

    const getIndUser = async (id) => {
        return 'working'
    }

    /* ################# USER CLIENT END ################### */
    /* ################# PROGRESS ################### */

    const getDistinctCategories = async () => {
        dispatch({ type: GET_PROGRESS_CATEGORY_BEGIN })
        try {
            const { data } = await authFetch.get('/prog/getcategory')
            const { dist_categories } = data
            dispatch({
                type: GET_PROGRESS_CATEGORY_SUCCESS,
                payload: { dist_categories },
            })
        } catch (error) {
            // logoutUser()
        }
        clearAlert()
    }

    const fetchUpdates = async (client_id) => {
        dispatch({ type: FETCH_PROGRESS_BEGIN })
        try {
            const { data } = await authFetch.get(`/prog/listcate/${client_id}`)
            const { dailyUpdates } = data
            dispatch({
                type: FETCH_PROGRESS_SUCCESS,
                payload: { dailyUpdates },
            })
        } catch (error) {
            // logoutUser()
        }
        clearAlert()
    }

    const addUpdate = async (category_id, d_update) => {
        const client_id = sessionStorage.getItem('ClientID')
        dispatch({ type: CREATE_ADD_PROGRESS_BEGIN })
        try {
            await authFetch.post('/prog', {
                category_id,
                client_id,
                d_update,
            })
            dispatch({ type: CREATE_ADD_PROGRESS_SUCCESS })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_ADD_PROGRESS_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    /* ################# PROGRESS END ################### */

    return (
        <AppContext.Provider
            value={{
                ...state,
                displayAlert,
                setupUser,
                logoutUser,
                updateUser,
                handleChange,
                clearValues,
                createCategory,
                getCategories,
                setEditCategory,
                editCategory,
                delCategory,
                createClient,
                getClients,
                setEditClient,
                editClient,
                delClient,
                setupGoogleUser,
                getUserlist,
                setSelectedClient,
                createUserClient,
                getUserClient,
                delUserClient,
                getIndUser,
                getDistinctCategories,
                fetchUpdates,
                addUpdate,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
const useAppContext = () => {
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }
