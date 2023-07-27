import { StatusCodes } from 'http-status-codes'
import CustomeAPIError from './custom-api.js'

class UnAuthenticatedError extends CustomeAPIError {
  constructor(message) {
    super(message)
    this.statusCodes = StatusCodes.UNAUTHORIZED
  }
}

export default UnAuthenticatedError
