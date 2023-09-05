import { useToast } from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
// ...

const ToastHelper = () => {
  const { alertType, alertText, alertTitle } = useAppContext()
  const toast = useToast()

  const showToast = () => {
    toast({
      position: 'bottom-left',
      title: alertTitle || 'Notification', // Use a default title if alertTitle is not provided
      description: alertText,
      status: alertType,
      duration: 3000, // How long the toast should be displayed (in milliseconds)
      isClosable: true, // Whether the toast can be closed by the user
    })
  }

  // Call showToast when the component mounts
  useEffect(() => {
    showToast()
  }, [])

  // return null // The Toast component doesn't need to render anything
}

export default ToastHelper
