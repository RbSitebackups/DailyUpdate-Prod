import React, { useContext, useReducer } from 'react'
import reducers from './reducers'
import axios from 'axios'
import PastelColours from './../assets/colourcodes/PastelColours'

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  DISPLAY_DIALOG,
  HIDE_DIALOG,
  DELETE_RECORD_BEGIN,
  DELETE_RECORD_SUCCESS,
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
  CREATE_SCHEDULE_BEGIN,
  CREATE_SCHEDULE_ERROR,
  CREATE_SCHEDULE_SUCCESS,
  GET_IND_SCHEDULE_BEGIN,
  GET_IND_SCHEDULE_SUCCESS,
  GET_CAMPAIGN_TITLE_SUCCESS,
  GET_EDM_TITLE_SUCCESS,
  EDIT_SCHEDULE_BEGIN,
  EDIT_SCHEDULE_ERROR,
  EDIT_SCHEDULE_SUCCESS,
  SETUP_USERCLIENT_SUCCESS,
  SETUP_USERCLIENT_ERROR,
} from './actions'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const ClientID = sessionStorage.getItem('ClientID')
const ClientName = sessionStorage.getItem('ClientName')

const lsUserClient = localStorage.getItem('userClient')
const _selectedClient = { ClientID, ClientName }

const initialState = {
  isLoading: false,
  showAlert: false,
  showDialog: false,
  rowID: '',
  endPointTarget: '',
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
  userClient: lsUserClient ? JSON.parse(lsUserClient) : [],
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
      if (error.response.status === 401 || error.response.status === 500) {
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

  const handleDelete = (_id, endPoint, callback) => {
    dispatch({ type: DISPLAY_DIALOG, payload: { _id, endPoint, callback } })
  }

  const hideDialog = () => {
    dispatch({ type: HIDE_DIALOG })
  }

  const delRecord = async (id, endPoint, callback) => {
    dispatch({ type: DELETE_RECORD_BEGIN })
    try {
      await authFetch.delete(`/${endPoint}/${id}`)
      callback()
      dispatch({ type: DELETE_RECORD_SUCCESS })
    } catch (error) {
      console.log(error.response)
    }
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }
  const removeUserToLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('userClient')
  }
  const addUserClientToLocalStorage = (userClient) => {
    localStorage.setItem('userClient', JSON.stringify(userClient))
  }

  const setupUserClient = async (user) => {
    const { _id } = user
    try {
      const { data } = await authFetch.get(`/userclient/getclients/${_id}`)
      const { assUserClient } = data
      const payload = user.isAdmin ? [] : { assUserClient }
      dispatch({
        type: SETUP_USERCLIENT_SUCCESS,
        payload: payload,
      })
      addUserClientToLocalStorage(payload)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`api/v1/auth/${endPoint}`, currentUser)
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
      const { data } = await axios.post('api/v1/auth/gregister', currentUser)
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
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
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
    const category_for = 'all'
    dispatch({ type: CREATE_CATEGORY_BEGIN })
    try {
      const { category_name } = state
      await authFetch.post('/cate', {
        category_name,
        category_for,
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
  const getRandomPastelColour = async () => {
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * PastelColours.length)

    // Get the random pastel color code
    const randomColour = PastelColours[randomIndex].code

    try {
      // Check if the color code already exists in the database
      const { data } = await authFetch.get(
        `/client/checkcolour/${randomColour}`
      )
      const { clientColour } = data

      if (clientColour === null) {
        // If it's not in the database, return the random color code
        return randomColour
      } else {
        // If it's in the database, recursively call the function to generate a new color code
        return getRandomPastelColour()
      }
    } catch (error) {
      // Handle any errors here
      console.error('Error checking color code:', error)

      // You might want to decide what to do in case of an error, e.g., return an error value.
      // For now, we'll return null to indicate an error.
      return null
    }
  }
  const createClient = async () => {
    const colourCode = await getRandomPastelColour()

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
        bgcolor: colourCode,
      })
      dispatch({ type: CREATE_CLIENT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
      getClients()
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
    const colourCode = await getRandomPastelColour()
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
        bgcolor: colourCode,
      })
      dispatch({ type: EDIT_CLIENT_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
      getClients()
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
  /* ################# EDM SCHEDULE Start ################### */

  const addSchedule = async (scheduleData) => {
    const client_id =
      scheduleData.clientID || sessionStorage.getItem('ClientID')
    dispatch({ type: CREATE_SCHEDULE_BEGIN })
    try {
      await authFetch.post('/schedule', {
        date_to_send: scheduleData.date_to_send,
        campaign_title: scheduleData.campaignTitle,
        edm_title: scheduleData.edmTitle,
        audience: scheduleData.audience,
        client_id: client_id,
      })
      dispatch({ type: CREATE_SCHEDULE_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_SCHEDULE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getSchedule = async () => {
    dispatch({ type: GET_IND_SCHEDULE_BEGIN })
    try {
      const { data } = await authFetch.get(`/schedule`)
      const { edmSchedule, totalEdmSchedules, numOfPages } = data

      dispatch({
        type: GET_IND_SCHEDULE_SUCCESS,
        payload: { edmSchedule, totalEdmSchedules, numOfPages },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  const getUCSchedule = async (userClientData) => {
    // Assuming `lsUserClient` contains the array of client data you provided

    dispatch({ type: GET_IND_SCHEDULE_BEGIN })
    // Extract the client IDs from lsUserClient
    let clientIds = []

    if (userClientData && userClientData.length > 0) {
      clientIds = userClientData.map((client) => client.client_id)
    }

    try {
      if (clientIds.length === 0) {
        // lsUserClient is null or empty, dispatch empty edmSchedule and totalEdmSchedules = 0
        dispatch({
          type: GET_IND_SCHEDULE_SUCCESS,
          payload: { edmSchedule: [], totalEdmSchedules: 0, numOfPages: 1 },
        })
      } else {
        // Fetch schedules that match the client_ids
        const { data } = await authFetch.get(`/schedule/alluserclient`, {
          params: {
            client_ids: clientIds.join(','), // Convert client IDs to comma-separated string
          },
        })

        const { edmSchedule, totalEdmSchedules, numOfPages } = data

        dispatch({
          type: GET_IND_SCHEDULE_SUCCESS,
          payload: { edmSchedule, totalEdmSchedules, numOfPages },
        })
      }
    } catch (error) {
      // Handle the error here
    }

    clearAlert()
  }

  const getIndSchedule = async () => {
    const client_id = sessionStorage.getItem('ClientID')

    dispatch({ type: GET_IND_SCHEDULE_BEGIN })
    try {
      const { data } = await authFetch.get(`/schedule/${client_id}`)
      const { edmSchedule, totalEdmSchedules, numOfPages } = data

      dispatch({
        type: GET_IND_SCHEDULE_SUCCESS,
        payload: { edmSchedule, totalEdmSchedules, numOfPages },
      })
    } catch (error) {
      // logoutUser()
    }
  }

  const getSchedulesByAssignedId = async (userID) => {
    const assigned_id = userID

    dispatch({ type: GET_IND_SCHEDULE_BEGIN })
    try {
      const { data } = await authFetch.get(
        `/schedule/allassignedclient/${assigned_id}`
      )
      const { edmSchedule, totalEdmSchedules, numOfPages } = data

      dispatch({
        type: GET_IND_SCHEDULE_SUCCESS,
        payload: { edmSchedule, totalEdmSchedules, numOfPages },
      })
    } catch (error) {
      // logoutUser()
    }
  }

  const getCampaignSuggestions = async () => {
    try {
      const { data } = await authFetch.get(`/schedule/ctitles`)
      const { campaignSuggestions } = data

      dispatch({
        type: GET_CAMPAIGN_TITLE_SUCCESS,
        payload: { campaignSuggestions },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  const getEdmSuggestions = async () => {
    try {
      const { data } = await authFetch.get(`/schedule/etitles`)
      const { edmSuggestions } = data

      dispatch({
        type: GET_EDM_TITLE_SUCCESS,
        payload: { edmSuggestions },
      })
    } catch (error) {
      // logoutUser()
    }
    clearAlert()
  }

  const editSchedule = async (modifiedSchedule) => {
    try {
      await authFetch.patch(`/schedule/${modifiedSchedule._id}`, {
        date_to_send: modifiedSchedule.date_to_send,
        campaign_title: modifiedSchedule.campaign_title,
        edm_title: modifiedSchedule.edm_title,
        audience: modifiedSchedule.audience,
        linked_edm:
          modifiedSchedule.linked_edm === 'none'
            ? null
            : modifiedSchedule.linked_edm,
        client_id: modifiedSchedule.client_id,
      })
      dispatch({ type: EDIT_SCHEDULE_SUCCESS })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: EDIT_SCHEDULE_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
  }

  /* ################# EDM SCHEDULE END ################### */

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        setupUserClient,
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
        addSchedule,
        getIndSchedule,
        handleDelete,
        hideDialog,
        delRecord,
        getCampaignSuggestions,
        getEdmSuggestions,
        editSchedule,
        getSchedule,
        getUCSchedule,
        getSchedulesByAssignedId,
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
