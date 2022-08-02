import React,{useState,useEffect,useContext} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Box,Button,Grid,Typography,Stack,AppBar,Toolbar ,IconButton,Modal,Badge} from '@mui/material';
// import logo from '../assets/logo/shenpop_logo.jpg'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import Cart from '../pages/Cart'
import CartContext from '../context/CartContext'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import {
  Link,
  useNavigate
} from "react-router-dom";


const headButton={
    fontSize:20,
    color:'primary.light',
    fontFamily:'Edu VIC WA NT Beginner',
    // fontWeight:700,
  }
  const menuHead={
    fontSize:40,
    color:'primary.dark',
    '&:hover':{
      color:'primary.main',
      backgroundColor:'primary.light'
    }
    // fontFamily:'Edu VIC WA NT Beginner',
    // fontWeight:700,
  }
let menuButton={
    color:'primary.light',
    fontSize:{xs:24,sm:24,md:24}
}

const menuStyle = {
    position: 'absolute',
    width: {xs:'100%',md:'30%'},
    height: '100%',
    backgroundColor: 'primary.light',
    
    justifyContent:'center',
    paddingTop:24,
    display: 'flex',
    marginBottom:12
   
  };
  const cartStyle = {
    position: 'absolute',
    right:'0%',
    width: {xs:'100%',md:'40%',lg:'25%'},
    height: '100%',
    backgroundColor:'primary.light',
    
   
  };
  

  
 
const Header = (
    // {menuOpen,setMenuOpen}
    ) => {
    let [menuOpen,setMenuOpen]=useState(false)
    let [cartOpen,setCartOpen]=useState(false)
    let [count,setCount]=useState(1)
    let {cart,cartCount}=useContext(CartContext)
    let navigate = useNavigate()


    
    useEffect(() => {
      setCount(cartCount())
  }, [cart])


  return (
    // #ddd9ce
    <AppBar position="sticky" sx={{
        boxShadow:2,
       
        // backgroundColor:'#71857d',
        backgroundColor:'primary.main',
        // paddingX:0
        }}>
         
        <Toolbar sx={{ my:{xs:0,lg:0},paddingX:{xs:1,sm:2},boxShadow:0}}>
        <Grid container display="flex" width='100%'>

          <Grid container item xs={2} md={4} justifyContent="flex-start">
            <Stack gap={4} justifyContent='flex-end' sx={{flexDirection:'row',display:{xs:'none',lg:'flex'}}}>
            <Button sx={headButton} onClick={()=>{navigate('/')}}>Home</Button>
              <Button sx={headButton} onClick={()=>{navigate('/about')}}>About</Button>
              
              <Button sx={headButton}   onClick={()=>{navigate('/shop')}}>Shop</Button>
              
            </Stack>
            <IconButton sx={{display:{xs:menuOpen?'none':'flex',lg:'none'}}}onClick={()=>{setMenuOpen(!menuOpen)}}>
                {menuOpen?<CloseIcon sx={menuButton}/>:<MenuIcon sx={menuButton} />}
            </IconButton>
          </Grid>

          <Grid container item xs={8} md={4} justifyContent="center" alignItems='center'>
            <Box onClick={()=>{navigate('/')}}>CUBEPLEX LOGO</Box>
          </Grid>


          <Grid container item xs={2} md={4} justifyContent="flex-end">
          <IconButton 
            // className="snipcart-checkout" 
              onClick={()=>{setCartOpen(true)}}
               sx={{
              marginLeft:{xs:1,sm:2,md:2},display:menuOpen?'none':'block',
              marginRight:{xs:0,md:0}}} >

                <Badge
                //  badgeContent={1} 
                 badgeContent={count} 
                 color="error" >
                  <ShoppingCartIcon sx={menuButton}/> 
                </Badge>
              
            </IconButton>
          </Grid>
        </Grid>
          
        </Toolbar>
        <Modal
        open={menuOpen}
        onClose={()=>setMenuOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        
        <Box flexDirection='column' backgroundColor= 'primary.light'>
          <Box display='flex' justifyContent="flex-end" >
          <IconButton onClick={()=>{setMenuOpen(false)}} sx={{margin:4}}>
            <CloseIcon sx={{fontSize:40,color:'primary.dark'}}/>
          </IconButton>
        </Box>
        <Box sx={menuStyle}>
          <Stack sx={{position: 'absolute',top:'10%'}}>
          <Button  sx={{...menuHead}} onClick={()=>{navigate('/');setMenuOpen(false)}}>Home</Button>
            <Button sx={{...menuHead}} onClick={()=>{navigate('/about');setMenuOpen(false)}}>About</Button>
            
            <Button sx={{...menuHead}}  onClick={()=>{navigate('/shop');setMenuOpen(false)}}>Shop</Button>
            
          </Stack>
        </Box>
        </Box>
      </Modal>



      <Modal
        open={cartOpen}
        onClose={()=>setCartOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        
        <Box flexDirection='column'  backgroundColor= 'rgba(0,0,0,.4)' sx={cartStyle}>
          <Box display='flex' justifyContent="flex-start"  height="8vh">
          <IconButton onClick={()=>{setCartOpen(false)}} sx={{margin:1}}>
            <ArrowBackOutlinedIcon sx={{fontSize:20,color:'#000',py:2}}/>
          </IconButton>
        </Box>
        <Box >
          <Cart/>
        </Box>
        </Box>
      </Modal>
      </AppBar>
  )
}

export default Header