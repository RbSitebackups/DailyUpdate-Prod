import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
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
} from './actions'

import { initialState } from './appContext'
import { googleLogout } from '@react-oauth/google'

const reducers = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertText: 'Please provide all values',
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertTitle: '',
            alertText: '',
        }
    }

    if (action.type === SETUP_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === SET_USER_CLIENT) {
        return {
            ...state,
            selectedClient: action.payload,
            client_id: action.payload.ClientID,
        }
    }

    if (action.type === SETUP_USER_SUCCESS) {
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
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    if (action.type === LOGOUT_USER) {
        googleLogout()
        return { ...initialState, user: null, token: null }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            showAlert: true,
            alertType: 'success',
            alertText: 'User profile updated.',
            alertTitle: action.payload.alertText,
        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value }
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
            category_name: '',
            client_name: '',
            client_initials: '',
            contact_name: '',
            contact_email: '',
            contact_phone: '',
        }
        return { ...state, ...initialState }
    }

    if (action.type === CREATE_CATEGORY_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === CREATE_CATEGORY_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }
    if (action.type === CREATE_CATEGORY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: 'true',
            alertType: 'success',
            alertText: 'New category created.',
            alertTitle: 'Success!',
        }
    }

    if (action.type === GET_CATEGORY_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_CATEGORY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            category: action.payload.category,
            totalCategories: action.payload.totalCategories,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === SET_EDIT_CATEGORY) {
        const category = state.category.find(
            (category) => category._id === action.payload.id
        )
        const { _id, category_name } = category
        return {
            ...state,
            isEditing: true,
            editCategoryID: _id,
            category_name,
        }
    }

    if (action.type === DELETE_CATEGORY_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === EDIT_CATEGORY_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === EDIT_CATEGORY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Updated successfully',
            alertTitle: 'Category',
        }
    }

    if (action.type === EDIT_CATEGORY_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    /* ######################### */

    if (action.type === CREATE_CLIENT_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === CREATE_CLIENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }
    if (action.type === CREATE_CLIENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: 'true',
            alertType: 'success',
            alertText: 'New client created.',
            alertTitle: 'Success!',
        }
    }

    if (action.type === GET_CLIENT_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_CLIENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            client: action.payload.client,
            totalClients: action.payload.totalClients,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === SET_EDIT_CLIENT) {
        const client = state.client.find(
            (client) => client._id === action.payload.id
        )
        const {
            _id,
            client_name,
            client_initials,
            contact_name,
            contact_email,
            contact_phone,
        } = client
        return {
            ...state,
            isEditing: true,
            editClientID: _id,
            client_name,
            client_initials,
            contact_name,
            contact_email,
            contact_phone,
        }
    }

    if (action.type === DELETE_CLIENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === EDIT_CLIENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === EDIT_CLIENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Updated successfully',
            alertTitle: 'Client',
        }
    }

    if (action.type === EDIT_CLIENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    if (action.type === CREATE_USER_CLIENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_USER_CLIENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Updated successfully',
            alertTitle: 'User assignment',
        }
    }

    if (action.type === CREATE_USER_CLIENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    if (action.type === GET_USER_CLIENT_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_USER_CLIENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            rows: action.payload.rows,
            totalRows: action.payload.totalRows,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === GET_USERLIST_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_USERLIST_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            userlist: action.payload.userlist,
        }
    }

    if (action.type === GET_PROGRESS_CATEGORY_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === GET_PROGRESS_CATEGORY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            dist_categories: action.payload.dist_categories,
        }
    }

    if (action.type === DELETE_USER_CLIENT_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === FETCH_PROGRESS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }

    if (action.type === FETCH_PROGRESS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            dailyUpdates: action.payload.dailyUpdates,
        }
    }

    if (action.type === CREATE_ADD_PROGRESS_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === CREATE_ADD_PROGRESS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Addeded successfully',
            alertTitle: 'Update',
        }
    }

    if (action.type === CREATE_ADD_PROGRESS_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'error',
            alertText: action.payload.msg,
            alertTitle: 'Error',
        }
    }

    throw new Error(`no such action: ${action.type}`)
}
export default reducers
