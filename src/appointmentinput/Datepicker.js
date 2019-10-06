import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import de from 'date-fns/locale/de'
import 'react-datepicker/dist/react-datepicker.css'
registerLocale('de', de)

export default function MyDatepicker() {
  const [startDate, setStartDate] = useState(Date.now())
  return (
    <DatePickerStyled
      selected={startDate}
      onChange={date => setStartDate(date)}
      locale='de'
      placeholderText='Einsatzbeginn'
      shouldCloseOnSelect={true}
      showTimeSelect
      timeFormat='HH:mm'
      timeIntervals={15}
      timeCaption='time'
      dateFormat='dd.MM.yyyy, HH:mm'
    />
  )
}

const DatePickerStyled = styled(DatePicker)`
  font-size: inherit;
`
