import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DatePicker, { registerLocale } from 'react-datepicker'
import de from 'date-fns/locale/de'
import 'react-datepicker/dist/react-datepicker.css'
registerLocale('de', de)

MyDatepicker.propTypes = {
  date: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
}

export default function MyDatepicker({ date, onChange }) {
  return (
    <DatePickerStyled
      selected={date}
      onChange={onChange}
      locale='de'
      minDate={new Date()}
      shouldCloseOnSelect={true}
      showTimeSelect
      timeFormat='HH:mm'
      timeIntervals={15}
      timeCaption='Uhrzeit'
      dateFormat='dd.MM.yyyy, HH:mm'
    />
  )
}

const DatePickerStyled = styled(DatePicker)`
  padding: 8px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #cccccc;
  font-size: inherit;
`
