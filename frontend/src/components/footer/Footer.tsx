import { FaGithub } from 'react-icons/fa';
// Todo Add github link
const Footer = () => {
    return (
        <footer>
            <div
                style={{
                    width: '100%',
                    minHeight: '10vh',
                    maxHeight: '20vh',
                    marginTop: 40,
                }}
            >
                <p
                    style={{
                        fontSize: '15px',
                        textAlign: 'center',
                        padding: '10px',
                        fontFamily: 'Playfair Display',
                        margin: '15px',
                    }}
                >
                    <a href='#' target='_blank' rel='noopener'>
                        <FaGithub
                            className='icon'
                            style={{
                                marginRight: '10px',
                                textAlign: 'center',
                                color: '#D8B6C4',
                                fontSize: '25px',
                            }}
                        />
                    </a>
                    Model - GPT 3.5 Turbo
                </p>
            </div>
        </footer>
    );
};

export default Footer;
