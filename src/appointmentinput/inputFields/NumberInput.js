import React from 'react'

export default function NumberInput({
  name,
  placeholder,
  step,
  min,
  defaultValue,
  onChange
}) {
  return (
    <input
      name={name}
      type='number'
      min={min}
      step={step}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}></input>
  )
}
