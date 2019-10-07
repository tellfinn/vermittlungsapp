import React from 'react'
import Select from 'react-select'

export default function LanguageOptions({ options, handleChange }) {
  return (
    <Select
      placeholder='Sprache'
      isMulti
      options={options}
      onChange={handleChange}></Select>
  )
}
