import React from 'react'
import Select from 'react-select'

export default function LanguageOptions({
  options,
  handleChange,
  name,
  value,
  defaultValue
}) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      placeholder={name}
      options={options}
      onChange={handleChange}></Select>
  )
}
