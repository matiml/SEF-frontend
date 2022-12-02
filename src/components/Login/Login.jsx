import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Links from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authorizeUser } from '../../services/users';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Links color="inherit" href="http://www.esdev-arg.com/">
        ESDev
      </Links>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loggedUser = {
            email: data.get('email'),
            password: data.get('password')
        }

        if (!loggedUser.email || !loggedUser.password) return

        authorizeUser(loggedUser)

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
        navigate('/sessions')
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#00b1ec' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesion
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Recordarme"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{backgroundColor: '#00b1ec', color: '#FFF', fontWeight: '600', textDecoration: 'none'}}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Ingresar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="#" style={{textDecoration: 'none'}}>
                                    Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" style={{textDecoration: 'none'}}>
                                    Registrarse
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}


export default Login;