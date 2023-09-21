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
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
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
  SET_USER_CLIENT,
  CREATE_USER_CLIENT_BEGIN,
  CREATE_USER_CLIENT_SUCCESS,
  CREATE_USER_CLIENT_ERROR,
  GET_USER_CLIENT_BEGIN,
  GET_USER_CLIENT_SUCCESS,
  GET_USERLIST_BEGIN,
  GET_USERLIST_SUCCESS,
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
  GET_SOCIAL_TITLE_SUCCESS,
  EDIT_SCHEDULE_BEGIN,
  EDIT_SCHEDULE_ERROR,
  EDIT_SCHEDULE_SUCCESS,
  SETUP_USERCLIENT_SUCCESS,
  SETUP_USERCLIENT_ERROR,
  GET_CAMPAIGN_BEGIN,
  GET_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_BEGIN,
  CREATE_CAMPAIGN_SUCCESS,
  CREATE_CAMPAIGN_ERROR,
  EDIT_CAMPAIGN_SUCCESS,
  EDIT_CAMPAIGN_ERROR,
  CREATE_SOCIAL_BEGIN,
  GET_IND_SOCIAL_BEGIN,
  CREATE_SOCIAL_ERROR,
  EDIT_SOCIAL_ERROR,
  CREATE_SOCIAL_SUCCESS,
  EDIT_SOCIAL_SUCCESS,
  GET_IND_SOCIAL_SUCCESS,
} from './actions'

import { initialState as defaultInitialState } from './appContext'
import { googleLogout } from '@react-oauth/google'
const reducers = (state, action) => {
  const initialState = {
    ...defaultInitialState,
    user: null,
    token: null,
    userClient: [],
  }
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: 'error',
        alertTitle: 'Error',
        alertText: 'Please provide all values',
      }

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertTitle: '',
        alertText: '',
      }

    case DISPLAY_DIALOG:
      return {
        ...state,
        showDialog: true,
        rowID: action.payload._id,
        endPointTarget: action.payload.endPoint,
        callback: action.payload.callback,
      }

    case HIDE_DIALOG:
      return {
        ...state,
        showDialog: false,
        rowID: '',
        endPointTarget: '',
        callback: '',
      }

    case SETUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        showAlert: true,
        alertType: 'success',
        alertText: 'Redirecting...',
        alertTitle: action.payload.alertText,
      }
    case DELETE_RECORD_BEGIN:
      return {
        ...state,
        showDialog: true,
        rowID: '',
        endPointTarget: '',
      }
    case DELETE_RECORD_SUCCESS:
      return {
        ...state,
        showDialog: false,
        showAlert: true,
        alertType: 'error',
        alertTitle: 'Notification',
        alertText: 'Record has been deleted.',
      }

    case DELETE_RECORD_BEGIN:
    case SETUP_USER_BEGIN:
    case UPDATE_USER_BEGIN:
    case CREATE_CATEGORY_BEGIN:
    case EDIT_CATEGORY_BEGIN:
    case CREATE_CLIENT_BEGIN:
    case EDIT_CLIENT_BEGIN:
    case CREATE_USER_CLIENT_BEGIN:
    case GET_USER_CLIENT_BEGIN:
    case GET_USERLIST_BEGIN:
    case GET_PROGRESS_CATEGORY_BEGIN:
    case FETCH_PROGRESS_BEGIN:
    case CREATE_ADD_PROGRESS_BEGIN:
    case CREATE_SCHEDULE_BEGIN:
    case GET_IND_SCHEDULE_BEGIN:
    case GET_CAMPAIGN_BEGIN:
    case GET_CATEGORY_BEGIN:
    case CREATE_CAMPAIGN_BEGIN:
    case CREATE_SOCIAL_BEGIN:
    case GET_IND_SOCIAL_BEGIN:
      return { ...state, isLoading: true }

    case DELETE_RECORD_SUCCESS:

    case UPDATE_USER_SUCCESS:
    case CREATE_CATEGORY_SUCCESS:
    case EDIT_CATEGORY_SUCCESS:
    case CREATE_CLIENT_SUCCESS:
    case EDIT_CLIENT_SUCCESS:
    case CREATE_USER_CLIENT_SUCCESS:
    case SETUP_USERCLIENT_SUCCESS:
    case CREATE_ADD_PROGRESS_SUCCESS:
    case CREATE_SCHEDULE_SUCCESS:
    case EDIT_SCHEDULE_SUCCESS:
    case CREATE_CAMPAIGN_SUCCESS:
    case EDIT_CAMPAIGN_SUCCESS:
    case CREATE_SOCIAL_SUCCESS:
    case EDIT_SOCIAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertTitle: action.payload?.alertText || 'Success',
        alertText: action.payload?.msg || 'Operation successful',
      }

    case SETUP_USER_ERROR:
    case UPDATE_USER_ERROR:
    case CREATE_CATEGORY_ERROR:
    case EDIT_CATEGORY_ERROR:
    case CREATE_CLIENT_ERROR:
    case EDIT_CLIENT_ERROR:
    case CREATE_USER_CLIENT_ERROR:
    case SETUP_USERCLIENT_ERROR:
    case CREATE_ADD_PROGRESS_ERROR:
    case CREATE_SCHEDULE_ERROR:
    case EDIT_SCHEDULE_ERROR:
    case CREATE_CAMPAIGN_ERROR:
    case EDIT_CAMPAIGN_ERROR:
    case CREATE_SOCIAL_ERROR:
    case EDIT_SOCIAL_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'error',
        alertTitle: 'Error',
        alertText: action.payload.msg,
      }

    case HANDLE_CHANGE:
      return { ...state, [action.payload.name]: action.payload.value }

    case CLEAR_VALUES:
      const initialState = {
        category_name: '',
        client_name: '',
        client_initials: '',
        contact_name: '',
        contact_email: '',
        contact_phone: '',
      }
      return { ...state, ...initialState }

    case SET_USER_CLIENT:
      return {
        ...state,
        selectedClient: action.payload,
        client_id: action.payload.ClientID,
      }

    case GET_CATEGORY_SUCCESS:
    case GET_CLIENT_SUCCESS:
    case GET_USER_CLIENT_SUCCESS:
    case GET_USERLIST_SUCCESS:
    case GET_PROGRESS_CATEGORY_SUCCESS:
    case FETCH_PROGRESS_SUCCESS:
    case GET_IND_SCHEDULE_SUCCESS:
    case GET_IND_SOCIAL_SUCCESS:
    case GET_CAMPAIGN_SUCCESS:
    case GET_EDM_TITLE_SUCCESS:
    case GET_SOCIAL_TITLE_SUCCESS:
    case GET_CAMPAIGN_TITLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      }

    case SET_EDIT_CATEGORY:
    case SET_EDIT_CLIENT:
      const item = state[action.payload.listName].find(
        (item) => item._id === action.payload.id
      )
      return {
        ...state,
        isEditing: true,
        editID: action.payload.id,
        ...item,
      }

    case LOGOUT_USER:
      googleLogout()
      return {
        ...defaultInitialState,
        user: null,
        token: null,
        userClient: [],
      }

    case GET_CLIENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false }

    default:
      throw new Error(`no such action: ${action.type}`)
  }
}

export default reducers
