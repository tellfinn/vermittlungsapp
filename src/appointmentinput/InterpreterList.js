import React from 'react'
import Select from 'react-select'

export default function InterpreterList({
  options,
  handleChange,
  name,
  value,
  selectMultiple = true
}) {
  return (
    <Select
      isMulti={selectMultiple}
      value={value}
      placeholder={name}
      options={options}
      onChange={handleChange}></Select>
  )
}
