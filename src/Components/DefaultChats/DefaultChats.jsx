import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { useOutletContext } from 'react-router-dom'
import { Box, Grid, Stack, Typography, useMediaQuery } from '@mui/material'
import { ThemeContext } from '../../Themes/Contexts'
import logoImg from '../../assets/Group 1000011097.png'
import Input from '../InputChat/Input'
import Card from '../Card/Card'
export default function DefaultChats({getAnswer}) {
  const screenSize = useMediaQuery('(max-width:768px)')
  const context = useOutletContext()

  return (
    <Stack alignItems={'center'} display={'flex'} justifyContent={'flex-end'} direction="column" spacing={screenSize ? 3 : 6} mb={screenSize ? 1 : 1} justifySelf={'end'}>
      <Box alignItems={'center'} justifyContent={'center'} display={'flex'} flexDirection={'column'}>
        <Typography component={'h1'} variant='p' sx={{}}
        >
          How Can I Help You Today?
        </Typography>

        <Box
          component={'img'}
          src={logoImg}
          height={65}
          width={69}
          borderRadius={2}
          flexShrink={0}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} p={3}>
          {context?.defaultChats?.map((item) => 
          <Grid key={item.heading} id={item.heading} item xs={12} md={6} 
          sx={{
            '&:hover .MuiIconButton-root': {
              opacity: 1
          },
          }}
          onClick={(e) => { console.log(e.currentTarget.id);getAnswer(e.currentTarget.id) }}>
            <Card heading={item.heading} subheading={item.sub}></Card>
          </Grid>)}
        </Grid>
      </Box>
    </Stack>
  )
}