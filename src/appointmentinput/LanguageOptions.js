import React from 'react'
import Select from 'react-select'

export default function LanguageOptions({ options, handleChange }) {
  return (
    <Select
      placeholder='Sprache'
      options={options}
      onChange={handleChange}></Select>
  )
}
