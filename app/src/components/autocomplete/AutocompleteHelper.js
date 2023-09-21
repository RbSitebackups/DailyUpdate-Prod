import { Input, List, ListItem, Text } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'

const AutocompleteInput = ({
  suggestions,
  callback,
  mainValue,
  name,
  placeholder,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const blurTimeoutRef = useRef(null)

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    const filteredSuggestions = suggestions.filter((suggestion) => {
      if (typeof suggestion === 'object' && suggestion.title) {
        return suggestion.title.toLowerCase().includes(inputValue.toLowerCase())
      }
      return false
    })
    setFilteredSuggestions(filteredSuggestions)
    callback(inputValue)
  }

  const handleSuggestionClick = (suggestion) => {
    const selectedValue = suggestion.title
    callback(selectedValue) // Update the state with the selected value
    setFilteredSuggestions([])
  }
  const handleInputBlur = () => {
    // Clear suggestions when Input loses focus, but with a delay
    blurTimeoutRef.current = setTimeout(() => {
      setFilteredSuggestions([])
    }, 100)
  }

  return (
    <div>
      <Input
        type='text'
        placeholder={placeholder}
        name={name}
        value={mainValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        borderRadius='2'
        autoComplete='off'
      />
      {filteredSuggestions.length > 0 && (
        <List
          styleType='none'
          p={0}
          m={0}
          overflowY='auto'
          width='100%'
          maxHeight='150px'
          position='absolute' // Set position to absolute
          top='100%' // Position below the text box
          left='0' // Align with the left edge of the text box
          zIndex={1} // Ensure the list appears above other elements
          boxShadow='md' // Add a box shadow for styling
          borderRadius='md' // Add rounded corners
          border='1px solid' // Add a border for styling
          borderColor='gray.200' // Set border color
          bg='white' // Set background color
        >
          {filteredSuggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              p={2}
              _hover={{ bg: 'gray.200' }}
              cursor='pointer'
            >
              <Text noOfLines={1}>{suggestion.title}</Text>{' '}
              {/* Limit text to one line */}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default AutocompleteInput
