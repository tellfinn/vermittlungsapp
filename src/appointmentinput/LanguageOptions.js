import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import styled from 'styled-components/macro'
import { getLanguages } from './services'

export default function LanguageOptions({ title }) {
  let [languages, setLanguages] = useState([])
  useEffect(() => {
    getLanguages().then(setLanguages)
  }, [])

  const options = languages
    .map(language => ({ value: language.name, label: language.name }))
    .sort((a, b) => {
      return a.name > b.name
    })

  return (
    <LanguageOptionsStyled>
      {title}
      <Select placeholder='Sprache' isMulti options={options}></Select>
    </LanguageOptionsStyled>
  )
}

const LanguageOptionsStyled = styled.label``
