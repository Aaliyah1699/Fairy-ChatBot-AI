import { Box, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { RiLoginCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/shared/CustomInput';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await auth?.signup(name, email, password);
            toast.success('Sign up successful', { id: 'signup' });
        } catch (error) {
            console.log(error);
            toast.error('Sign up Unsuccessful', { id: 'signup' });
        }
    };

    useEffect(() => {
        if (auth?.user) {
            return navigate('/chat');
        }
    }, [auth, navigate]);

    return (
        <Box width={'100%'} height={'100%'} display='flex' flex={1}>
            <Box padding={8} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
                <img
                    src='gate.jpeg'
                    alt='purple sky with gate image'
                    style={{
                        width: '400px',
                        height: '750px',
                        borderRadius: '40px',
                    }}
                />
            </Box>

            <Box
                display={'flex'}
                flex={{ xs: 1, md: 0.5 }}
                justifyContent={'center'}
                alignItems={'center'}
                padding={2}
                ml={'auto'}
                mr={'auto'}
                mt={0}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        margin: 'auto',
                        padding: '30px',
                        boxShadow: '10px 10px 20px #B39BC8',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            fontFamily: 'Lato',
                        }}
                    >
                        <Typography
                            variant='h4'
                            textAlign='center'
                            padding={2}
                            fontWeight={600}
                            fontFamily={'Playfair Display'}
                        >
                            SIGNUP
                        </Typography>
                        <CustomInput type='text' name='name' label='Name' />
                        <CustomInput type='email' name='email' label='Email' />
                        <CustomInput
                            type='password'
                            name='password'
                            label='Password'
                        />
                        <Button
                            type='submit'
                            sx={{
                                px: 2,
                                py: 1,
                                mt: 2,
                                width: '500px',
                                borderRadius: 2,
                                bgcolor: '#87629A',
                                color: '#E5DCEF',
                                ':hover': {
                                    bgcolor: '#E5DCEF',
                                    color: '#87629A',
                                },
                                fontFamily: 'Playfair Display',
                                fontSize: '20px',
                                fontWeight: 'bolder',
                            }}
                            endIcon={<RiLoginCircleLine />}
                        >
                            Signup
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Signup;
