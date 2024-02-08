import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div
            style={{
                display: 'flex',
                marginRight: 'auto',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            <Link to={'/'}>
                <img src='floral.png' alt='floral wreath' className='logo' />
            </Link>
            <Typography
                sx={{
                    display: { md: 'block', sm: 'none', xs: 'none' },
                    mr: 'auto',
                    fontWeight: '600',
                    color: '#FAF8F6',
                    textShadow: '2px 4px 20px #D8B6C4',
                    fontFamily: 'Great Vibes',
                    fontSize: '40px',
                }}
            >
                Fairy GodBot
            </Typography>
        </div>
    );
};

export default Logo;
