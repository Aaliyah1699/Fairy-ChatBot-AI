/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ChatItem from '../components/chat/ChatItem';
import { AiOutlineSend } from 'react-icons/ai';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    deleteUserChats,
    getUserChats,
    sendChatRequest,
} from '../helpers/api-connect';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const Chat = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const auth = useAuth();

    const [chatMessages, setChatMessages] = useState<Message[]>([]);

    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;

        if (inputRef && inputRef.current) {
            inputRef.current.value = '';
        }

        const newMessage: Message = { role: 'user', content };
        setChatMessages((prev) => [...prev, newMessage]);

        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    };

    const handleDeleteChats = async () => {
        try {
            toast.loading('Deleting Chat', { id: 'deletechats' });
            await deleteUserChats();
            setChatMessages([]);
            toast.success('Chat Deleted ', { id: 'deletechats' });
        } catch (error) {
            console.log(error);
            toast.error('Error deleting chat', { id: 'deletechats' });
        }
    };

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            toast.loading('Loading Chat', { id: 'loadchats' });
            getUserChats()
                .then((data) => {
                    setChatMessages([...data.chats]);
                    toast.success('Chat loaded', { id: 'loadchats' });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('Error loading Chat', { id: 'loadchats' });
                });
        }
    }, [auth]);

    useEffect(() => {
        if (!auth?.user) {
            return navigate('/login');
        }
    }, [auth, navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '100%',
                mt: 3,
                gap: 3,
            }}
        >
            {/*  */}
            <Box
                sx={{
                    display: { md: 'flex', sm: 'none', xs: 'none' },
                    flex: 0.2,
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '60vh',
                        bgcolor: '#A596AD',
                        borderRadius: '15px',
                        flexDirection: 'column',
                        mx: 2,
                    }}
                >
                    <Avatar
                        sx={{
                            mx: 'auto',
                            my: 2,
                            bgcolor: '#FAF8F6',
                            color: '#D8B6C4',
                        }}
                    >
                        <img
                            src='user-avatar.jpeg'
                            alt='pink sky #FAF8F6 clouds image'
                            width={'40px'}
                            height={'40px'}
                            style={{ borderRadius: '50%' }}
                        />
                    </Avatar>
                    <Typography
                        sx={{
                            mx: 'auto',
                            fontFamily: 'Lato',
                            color: '#1E192B',
                        }}
                    >
                        You are talking to a ChatBot
                    </Typography>
                    <Typography
                        sx={{
                            mx: 'auto',
                            fontFamily: 'Lato',
                            my: 3,
                            p: 3,
                            color: '#1E192B',
                        }}
                    >
                        You can ask anything questions related to
                        knowledge,Business, Advice, Education, etc. But avoid
                        sharing personal information
                    </Typography>
                    <Button
                        onClick={handleDeleteChats}
                        sx={{
                            width: '200px',
                            my: 'auto',
                            mx: 'auto',
                            color: '#FAF8F6',
                            fontWeight: '700',
                            fontFamily: 'Playfair Display',
                            borderRadius: 3,
                            bgcolor: '#990009',
                            ':hover': {
                                bgcolor: '#990009',
                            },
                        }}
                    >
                        Clear Conversation
                    </Button>
                </Box>
            </Box>
            {/*  */}
            <Box
                sx={{
                    display: 'flex',
                    flex: { md: 0.8, sm: 1, xs: 1 },
                    flexDirection: 'column',
                    px: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: '40px',
                        fontFamily: 'Playfair Display',
                        color: '#FAF8F6',
                        mb: 2,
                        mx: 'auto',
                    }}
                >
                    Ask a Captivating Question, Kind Human 🧚🏾‍♀️
                </Typography>
                {/*  */}
                <Box
                    sx={{
                        width: '100%',
                        height: '60vh',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: 'Lato',
                        overflow: 'scroll',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        scrollBehavior: 'smooth',
                    }}
                >
                    {chatMessages.map((chat, index) => (
                        <ChatItem
                            content={chat.content}
                            // @ts-ignore
                            role={chat.role}
                            key={index}
                        />
                    ))}
                </Box>
                <div
                    style={{
                        width: '100%',
                        borderRadius: '120px',
                        backgroundColor: '#A596AD',
                        display: 'flex',
                        margin: 'auto',
                        marginTop: '10px',
                    }}
                >
                    <input
                        ref={inputRef}
                        type='text'
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            padding: '30px',
                            border: 'none',
                            outline: 'none',
                            color: '#1E192B',
                            fontFamily: 'Lato',
                            fontSize: '20px',
                        }}
                    />
                    <IconButton
                        onClick={handleSubmit}
                        sx={{ ml: 'auto', color: '#1E192B', mx: 1 }}
                    >
                        <AiOutlineSend />
                    </IconButton>
                </div>
            </Box>
        </Box>
    );
};

export default Chat;
