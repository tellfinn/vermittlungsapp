import React, { useState } from 'react'
import styled from 'styled-components'

export default function({ name, placeholder, defaultValue, onChange }) {
  return (
    <label>
      <input
        type='text'
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </label>
  )
}
