import React from 'react';
import './StartButton.css'
interface StartButtonProps {
    onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => (
    <button className='start-btn' onClick={onClick}>Start Quiz</button>
);

export default StartButton;
