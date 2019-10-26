import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { getUsers } from '../users/services'

export default function InterpreterList({
  options,
  handleChange,
  name,
  value,
  selectMultiple = true
}) {
  const [interpreters, setInterpreters] = useState([])

  useEffect(() => {
    getUsers().then(setInterpreters)
  }, [])

  return (
    <Select
      isMulti={selectMultiple}
      value={value}
      placeholder={name}
      options={interpreters}
      onChange={handleChange}></Select>
  )
}
