import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from '@material-ui/core'
import {useStore} from 'effector-react'
import {$modal, hideAuthCodeModal} from './model'

type Props = {
  onSaveClick: (code: string) => void,
}

export const AuthCodeDialog: React.FC<Props> = ({onSaveClick}) => {
  const [code, setCode] = React.useState('')
  const open = useStore($modal)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCode(event.target.value)
  }
  const handleClick = (): void => {
    onSaveClick(code)
    hideAuthCodeModal()
  }

  const disabled = !(code.length === 4)

  const handleEnterPress = (e: React.KeyboardEvent): void => {
    if (e.keyCode === 13 && !disabled) {
      handleClick()
      e.preventDefault()
    }
  }

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Enter 4-digit auth code</DialogTitle>
      <DialogContent>
        <TextField type="number" required fullWidth 
          onChange={handleChange}
          onKeyDown={handleEnterPress}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={hideAuthCodeModal}>Close</Button>
        <Button disabled={disabled} onClick={handleClick}>Save device</Button>
      </DialogActions>
    </Dialog>
  )
}
