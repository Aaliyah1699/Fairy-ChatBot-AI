import { Box, useMediaQuery, useTheme } from '@mui/material';
import TypingAnimation from '../components/animation/TypingAnimation';
import Footer from '../components/footer/Footer';

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box width={'100%'} height={'100%'}>
            {/* Animation */}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mx: 'auto',
                    mt: 3,
                }}
            >
                <Box>
                    <TypingAnimation />
                </Box>
                {/* image */}
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: {
                            md: 'row',
                            xs: 'column',
                            sm: 'column',
                        },
                        gap: 10,
                        my: 2,
                    }}
                >
                    <img
                        src='wings.png'
                        alt='pink wings image image'
                        style={{ width: '200px', margin: 'auto' }}
                    />
                    <img
                        className='rotate'
                        src='floral.png'
                        alt='floral wreath image'
                        style={{ width: '125px', margin: 'auto' }}
                    />
                    {/*  */}
                </Box>
                <Box sx={{ display: 'flex', width: '100%', mx: 'auto' }}>
                    <img
                        src='forest.jpeg'
                        alt='fake fairy forest'
                        style={{
                            display: 'flex',
                            margin: 'auto',
                            width: isBelowMd ? '80%' : '60%',
                            borderRadius: 20,
                            boxShadow: '-5px -5px 105px #87629A',
                            marginTop: 20,
                        }}
                    />
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Home;
