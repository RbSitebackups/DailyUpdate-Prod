import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext'

const AlertHelper = () => {
  const { alertType, alertText, alertTitle } = useAppContext()
  return (
    <Alert status={alertType}>
      <AlertIcon />
      {!alertTitle && alertText}
      {alertTitle && (
        <div>
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertText}</AlertDescription>
        </div>
      )}
    </Alert>
  )
}
export default AlertHelper
