import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import Close from '@mui/icons-material/Close'
import { ThemeContext } from '../../Themes/Contexts'
import image from '../../assets/Group 1000011095.png'
import EditIcon from "../../assets/image 31.png"
import { useNavigate, useOutletContext } from 'react-router-dom'
export default function SideMenu({ handleClose,setChats }) {
  const screenSize = useMediaQuery('(max-width:768px)')
  const { mode, setMode } = useContext(ThemeContext)
  const navigate = useNavigate()
  return (
    <Box >
      {screenSize && <Button sx={{ flexGrow: 1, width: '100%', textAlign: 'right', justifyContent: 'flex-end', color: mode == 'light' ? 'primary.dark' : 'text.primary' }}
        onClick={() => { handleClose(false) }}
        endIcon={<Close />}
      >CLose</Button>}

      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={2} spacing={1}
        px={{ xs: 2, md: 3 }} sx={{ bgcolor: 'primary.main' }}
        onClick={() => {
          navigate('')
          handleClose(false)
          setChats([])
          
        }}>
        <Box
          component={'img'}
          src={image}
          height={33}
          width={32}
          borderRadius={2}
          flexShrink={0}
        />
        <Typography component={'h2'} sx={{ mr: 3 }}>New Chat</Typography>
        <Box
          component={'img'}
          src={EditIcon}
          height={33}
          width={32}
          borderRadius={2}
          flexShrink={0}
        />
      </Stack>
      <Stack sx={{ margin: 'auto', width: '90%' }}>
        <Button onClick={() => { navigate('/history'); handleClose(false) }} sx={{ bgcolor: 'primary.main', color: 'text.primary', background: 'primary.main', mt: 1 ,'&:hover':{bgcolor:'primary.dark'
    }}}>Past Conversation</Button>
      </Stack>
    </Box>
  )
}
