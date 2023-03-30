import React, { useState } from 'react'
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from '../../service/api';

const Component = styled(Box)`
  width : 400px;
  margin: auto;
  box-shadow : 5px 2px 5px 2px rgb(0 0 0/0.6);

`

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0"
});

const Wrapper = styled(Box)`
  padding:25px 35px;
  display : flex;
  flex : 1;
  flex-direction: column;
  &>div,&>button,&>p{
    margin-top :20px;
  }
`;
const Loginbutton = styled(Button)`
  text-transform:none;
  background:#FB641B;
  color : #fff;
  height:48px;
  border-radius:2px
`;

const Signupbutton = styled(Button)`
  text-transform:none;
  background:##fff;
  color : #2874f0;
  height:48px;
  border-radius:2px;
  box-shadow: 0 2px 4px rgb(0 0 0/20%)
`;

const Error = styled(Typography)`
  font-weight:10px;
  color#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600;

`

const Text = styled(Typography)`
  color:#878787;
  font-size:16px;
`

const loginInitialValues = {
  username: '',
  password: ''
}

const signupInitialValues = {
  name: '',
  username: '',
  password: ''
}

const Login = () => {
  const imageURI = "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [account, toggleAccount] = useState('login');
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const [login, setLogin] = useState(loginInitialValues);

  const toggleSignup = () => {
    account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
  }
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });

  }

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError('');
      setSignup(signupInitialValues);
      toggleAccount('login');
    } else {
      setError('Something went wrong! Please try again later');
    }
  }

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError('');
    } else {
      setError("Something went wrong! Please try again later..!");
    }
  }

  return (
    <Component>
      <Box>
        <Image src={imageURI} alt="login" />
        {
          account === 'login' ?
            <Wrapper>
              <TextField variant="standard" name='username' value={login.username} onChange={(e) => onValueChange(e)} label="Enter Username" />
              <TextField variant="standard" name='password' value={login.password} onChange={(e) => onValueChange(e)} label="Enter Password" />

              {error && <Error>{error}</Error>}

              <Loginbutton variant="contained" onClick={() => { loginUser() }}>Login</Loginbutton>
              <Typography style={{ textAlign: 'center' }}>OR</Typography>
              <Signupbutton onClick={() => toggleSignup()}>Create an Account</Signupbutton>
            </Wrapper>
            :
            <Wrapper>
              <TextField onChange={(e) => { onInputChange(e) }} name='name' variant="standard" label="Enter Name" />
              <TextField onChange={(e) => { onInputChange(e) }} name='username' variant="standard" label="Enter Username" />
              <TextField onChange={(e) => { onInputChange(e) }} name='password' variant="standard" label="Enter Password" />

              {error && <Error>{error}</Error>}

              <Signupbutton onClick={() => signupUser()}>Signup</Signupbutton>
              <Typography style={{ textAlign: 'center' }}>OR</Typography>
              <Loginbutton variant='contained' onClick={() => toggleSignup()}>Already have an Account</Loginbutton>
            </Wrapper>
        }
      </Box>
    </Component>
  )
}

export default Login





