import { Box, IconButton, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ReactComponent as AIProfile } from '../../assets/Group 1000011097 (1).svg'
import { ReactComponent as Profile } from '../../assets/Group 1000011096.svg'
import { ReactComponent as ThumbUp } from '../../assets/image 32.svg'
import { ReactComponent as ThumbDown } from '../../assets/image 33.svg';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import SuggesionModal from '../Modal/Modal'
export default function ChatCard({
  details, isReadOnly=false,setChats
}) {
  const [stars, setStars] = useState(0);
  const [isLike, setIsLike] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [fb, setFb] = useState('')
  console.log(details,isReadOnly)

  useEffect(()=>{
    isLike?setChats((prev) =>
      prev.map((item) => {
        if (item?.AI?.id == details.id) {
          return { ...item,AI:{...item?.AI, rating: stars || 0 }};
        } else {
          return { ...item };
        }
      })):console.log('not updated')
  },[stars])

  useEffect(()=>{
    fb?setChats((prev) =>
      prev.map((item) => {
        if (item?.AI?.id == details.id) {
          return { ...item,AI:{...item?.AI, fb: fb || '' }};
        } else {
          return { ...item };
        }
      })):console.log('not updated')
  },[fb])
  
  let time=new Date(details?.time||new Date())
  console.log(time)
  return <Stack
    sx={{
      boxShadow:!isReadOnly&& "0 0 4px rgba(0,0,0,0.1)",
      bgcolor: isReadOnly ? "primary.main" : "primary.light",
      '&:hover #likeBtn':{
        visibility:'visible'
      }
    }}
    m={3}
    borderRadius={3}
    direction={'row'}
    spacing={1}
    // alignItems={isLike?'':'center'}
    // flexGrow={1}
    p={3}
  >
    <Box width={70} height={66} minWidth={69}>
      {details?.type == 'Human' ? <Profile /> : <AIProfile />}
    </Box>
    
    <Box height={'fit-content'}>
      <Stack>
        <Typography variant='heading' >{details?.type == 'AI' ? 'Soul AI' : 'You'}</Typography>
        <Typography variant='p' >{details?.chat||'chat'}</Typography>
        <Stack
          direction={'row'} spacing={3} mt={1} alignItems={'center'}
        >
          <Typography variant='subheading' sx={{ opacity: 0.6, fontSize: 14 }}>{time?.toLocaleTimeString() || '09:03PM'}
          </Typography>
          {details?.type == 'AI'&&!isReadOnly ? <Stack display={'flex'} direction={'row'} spacing={0} id={'likeBtn'} visibility={{xs:'visible',md:'hidden'}}>
            <IconButton onClick={() => setIsLike((prev) => !prev)}>
              {isLike ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon cursor={'pointer'} />}
            </IconButton>
            <IconButton>
              <ThumbDownAltOutlinedIcon cursor={'pointer'} onClick={()=>setIsOpen(true)}/>
            </IconButton>
          </Stack> : ''}
        </Stack>
        {(isLike ||isReadOnly&& details?.rating>0) && <Typography component="legend">{!isReadOnly ? 'Rate' : 'Ratings'}</Typography>}
        {(isLike ||isReadOnly&& details?.rating>0 )&& <Rating disabled={isReadOnly}
          name="simple-controlled"
          value={stars||details?.rating}
          sx={{
            width: "fit-content"
          }}
          onChange={(_, val) => {
            isLike ? setStars(val) : console.log(val);
            console.log(val)
          }}
        />}
        {details?.fb&&<Typography component={'legend'} variant='p'>Feedback: <Typography component={'span'} variant='p' sx={{opacity:0.7}} color={'text.primary'}>{details?.fb}</Typography></Typography>}
      </Stack>
      {!isReadOnly&&<SuggesionModal open={isOpen} handleClose={setIsOpen} setFeedback={setFb}/>}
    </Box>
  </Stack>
}
