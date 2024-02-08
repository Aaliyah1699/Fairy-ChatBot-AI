import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post('/user/login', { email, password });

    if (res.status !== 200) {
        throw new Error('Login failed');
    }

    const data = await res.data;
    return data;
};

export const signUpUser = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await axios.post('/user/signup', { name, email, password });

    if (res.status !== 201) {
        throw new Error('Unable to sign up');
    }

    const data = await res.data;
    return data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get('/user/auth-status');

    if (res.status !== 200) {
        throw new Error('Unable to authenticate user');
    }

    const data = await res.data;
    return data;
};

export const sendChatRequest = async (message: string) => {
    const res = await axios.post('/chat/new', { message });

    if (res.status !== 200) {
        throw new Error('Unable to send message');
    }

    const data = await res.data;
    return data;
};

export const getUserChats = async () => {
    const res = await axios.get('/chat/all-chats');

    if (res.status !== 200) {
        throw new Error('Unable to receive messages');
    }

    const data = await res.data;
    return data;
};

export const deleteUserChats = async () => {
    const res = await axios.delete('/chat/delete');

    if (res.status !== 200) {
        throw new Error('Unable to delete messages');
    }

    const data = await res.data;
    return data;
};

export const logoutUser = async () => {
    const res = await axios.get('/user/logout');

    if (res.status !== 200) {
        throw new Error('Unable to logout');
    }

    const data = await res.data;
    return data;
};
