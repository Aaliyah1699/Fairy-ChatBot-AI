import { Avatar, Box, Typography } from '@mui/material';
// import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const extractCodeFromString = (message: string) => {
    if (message.includes('```')) {
        const blocks = message.split('```');
        return blocks;
    }
};

const isCodeBlock = (str: string) => {
    if (
        str.includes('=') ||
        str.includes(';') ||
        str.includes('[') ||
        str.includes(']') ||
        str.includes('{') ||
        str.includes('}') ||
        str.includes('#') ||
        str.includes('//')
    ) {
        return true;
    }
    return false;
};

const ChatItem = ({
    content,
    role,
}: {
    content: string;
    role: 'user' | 'assistant';
}) => {
    // const auth = useAuth();
    const messageBlocks = extractCodeFromString(content);

    return role === 'assistant' ? (
        <Box
            sx={{
                display: 'flex',
                p: 2,
                bgcolor: '#1E192B',
                my: 1,
                gap: 2,
                borderRadius: '120px',
            }}
        >
            <Avatar sx={{ ml: '0' }}>
                <img
                    src='ai-avatar.jpeg'
                    alt='black sky purple clouds image'
                    width={'40px'}
                    height={'40px'}
                    style={{ borderRadius: '50%' }}
                />
            </Avatar>
            <Box>
                {!messageBlocks && (
                    <Typography
                        sx={{
                            fontFamily: 'Lato',
                            fontSize: '18px',
                            letterSpacing: '1px',
                            color: '#FAF8F6',
                        }}
                    >
                        {content}
                    </Typography>
                )}
                {/*  */}
                {messageBlocks &&
                    messageBlocks.length &&
                    messageBlocks.map((block) =>
                        isCodeBlock(block) ? (
                            <SyntaxHighlighter
                                style={oneDark}
                                language='javascript'
                                wrapLongLines={true}
                            >
                                {block}
                            </SyntaxHighlighter>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: 'Lato',
                                    fontSize: '18px',
                                    letterSpacing: '1px',
                                    color: '#FAF8F6',
                                }}
                            >
                                {block}
                            </Typography>
                        )
                    )}
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                display: 'flex',
                p: 2,
                bgcolor: '#87629A',
                gap: 2,
                borderRadius: '120px',
                color: '#FAF8F6',
            }}
        >
            <img
                src='user-avatar.jpeg'
                alt='pink sky white clouds image'
                width={'40px'}
                height={'40px'}
                style={{ borderRadius: '50%' }}
            />
            <Box>
                <Typography
                    fontFamily={'Lato'}
                    fontSize={'18px'}
                    color={'#FAF8F6'}
                >
                    {content}
                </Typography>
            </Box>
        </Box>
    );
};

export default ChatItem;
