import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                'A Magic Spell is Being Cast🪄',
                2000,
                'Powered by OpenAI',
                1500,
                'Welcome to Your Fairy GodBot',
                1500,
                'Conversations Full of Wonder',
                1500,
                'Sign in to Start Chatting',
                3000,
            ]}
            speed={50}
            style={{
                fontSize: '60px',
                fontFamily: 'Shadows Into Light',
                color: '#FAF8F6',
                display: 'inline-block',
                textShadow: '1px 1px 20px 	#D8B6C4',
            }}
            repeat={Infinity}
        />
    );
};

export default TypingAnimation;
