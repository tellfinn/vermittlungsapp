import React from 'react'

export default function Checkbox({ name, checked, onChange, text }) {
  return (
    <label>
      <input
        type='checkbox'
        name={name}
        checked={checked}
        onChange={onChange}
      />{' '}
      {text}
    </label>
  )
}
