import React from 'react'
import Select from 'react-select'

export default function LanguageOptions({
  options,
  handleChange,
  name,
  defaultValue
}) {
  return (
    <Select
      value={defaultValue}
      placeholder={name}
      options={options}
      onChange={handleChange}></Select>
  )
}
