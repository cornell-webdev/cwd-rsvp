import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, theme } from 'cornell-glue-ui'
import React from 'react'

const BackButton = () => {
  return (
    <Button
      variant='text'
      size='small'
      startIcon={<ChevronLeftIcon />}
      color={theme.text.default}
      background={theme.grey[100]}
      hoverBackground={theme.grey[200]}>
      Back
    </Button>
  )
}

export default BackButton
