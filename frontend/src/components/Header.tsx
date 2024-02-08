import { AppBar, Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavLinks from './shared/NavLinks';

const Header = () => {
    const auth = useAuth();

    return (
        <AppBar
            sx={{
                bgcolor: 'transparent',
                position: 'static',
                boxShadow: 'none',
                mt: 1,
            }}
        >
            <Toolbar sx={{ display: 'flex' }}>
                <Logo />

                <div>
                    {auth?.isLoggedIn ? (
                        <>
                            <NavLinks
                                bg='#87629A'
                                to='/chat'
                                text='New Chat'
                                textColor='#E5DCEF'
                            />
                            <NavLinks
                                bg='#E5DCEF'
                                to='/logout'
                                text='Logout'
                                textColor='#87629A'
                                onClick={auth.logout}
                            />
                        </>
                    ) : (
                        <>
                            <NavLinks
                                bg='#87629A'
                                to='/login'
                                text='Login'
                                textColor='#E5DCEF'
                            />
                            <NavLinks
                                bg='#E5DCEF'
                                to='/signup'
                                text='Sign up'
                                textColor=' #87629A'
                            />
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
