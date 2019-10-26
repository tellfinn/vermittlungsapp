import React from 'react'
import styled from 'styled-components'

export default function CheckBox({ name, checked, onChange, text }) {
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
