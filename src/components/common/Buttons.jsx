import React from 'react'
import Button  from '@mui/material/Button'

const Buttons = ({title , handleAction}) => {
  return (
    <Button variant="contained" onClick={handleAction}>
        {title}
    </Button>
  )
}

export default Buttons