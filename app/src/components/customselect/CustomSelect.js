import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  Box,
} from '@chakra-ui/react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const CustomSelect = ({
  name,
  value,
  options = [],
  onValueChange,
  placeholder,
  bg,
}) => {
  const [selectedValue, setSelectedValue] = useState(value)

  const handleInput = (selectedOption) => {
    setSelectedValue(selectedOption)
    if (onValueChange) {
      onValueChange(selectedOption)
    }
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Box}
            width='100%'
            position='relative'
          >
            <Input
              borderRadius='2'
              placeholder={placeholder}
              name={name}
              value={selectedValue}
              readOnly
              bg={bg ? bg : 'transparent'}
              onClick={(e) => e.preventDefault()}
            />
            {isOpen ? (
              <BsChevronUp
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            ) : (
              <BsChevronDown
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </MenuButton>
          <MenuList>
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleInput(option)}
              >
                {option}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default CustomSelect
