import React from 'react'
import Select from 'react-select'

export default function LanguageSelector({
  options,
  handleChange,
  name,
  value,
  defaultValue,
  selectMultiple = false
}) {
  return (
    <Select
      isMulti={selectMultiple}
      defaultValue={defaultValue}
      value={value}
      placeholder={name}
      options={options}
      onChange={handleChange}></Select>
  )
}
