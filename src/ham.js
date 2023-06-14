import React, { useState } from 'react';

const HamburgerButton = ({ onClick, isOpen }) => (
  <div
    style={{
      display: 'inline-block',
      width: '25px',
      height: '20px',
      position: 'relative',
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    <span
      style={{
        display: 'block',
        position: 'absolute',
        height: '3px',
        width: '100%',
        background: '#000',
        borderRadius: '3px',
        opacity: '1',
        left: '0',
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
        transition: '0.25s ease-in-out',
        top: isOpen ? '7px' : '0'
      }}
    />
    <span
      style={{
        display: 'block',
        position: 'absolute',
        height: '3px',
        width: '100%',
        background: '#000',
        borderRadius: '3px',
        opacity: isOpen ? '0' : '1',
        left: '0',
        transition: '0.25s ease-in-out',
        top: '7px'
      }}
    />
    <span
      style={{
        display: 'block',
        position: 'absolute',
        height: '3px',
        width: '100%',
        background: '#000',
        borderRadius: '3px',
        opacity: '1',
        left: '0',
        transform: isOpen ? 'rotate(-45deg)' : 'rotate(0)',
        transition: '0.25s ease-in-out',
        top: isOpen ? '7px' : '14px'
      }}
    />
  </div>
);

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <HamburgerButton onClick={handleButtonClick} isOpen={isOpen} />
    </div>
  );
};

export default App;


