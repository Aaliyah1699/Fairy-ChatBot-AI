const NotFound = () => {
    return (
        <main
            style={{
                textAlign: 'center',
                fontFamily: 'Playfair Display',
                fontWeight: 'bolder',
                letterSpacing: '1px',
            }}
        >
            <h1 style={{ color: '#87629A' }}>Page Not Found</h1>
            <p>Sorry, we could not find the page you are looking for.</p>
            <a href='/' style={{ color: '#D8B6C4' }}>
                Go Back Home
            </a>
        </main>
    );
};

export default NotFound;
