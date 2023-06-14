import React, { useState } from 'react';
import { RiToggleFill } from 'react-icons/ri';
import './App.css'



const ResumeBuilder = () => {
  const [toggleState, setToggleState] = useState(true);

  const [sections, setSections] = useState([
    { id: 1, name: 'Education', enabled: true },
    { id: 2, name: 'Experience', enabled: true },
    { id: 3, name: 'Skills', enabled: true },
    { id: 5, name: 'Projects', enabled: true },
  ]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const id = e.dataTransfer.getData('text/plain');
    const sectionIndex = sections.findIndex((section) => section.id === Number(id));
    if (sectionIndex !== -1) {
      const updatedSections = [...sections];
      const [removed] = updatedSections.splice(sectionIndex, 1);
      updatedSections.splice(index, 0, removed);
      setSections(updatedSections);
    }
  };

  const handleSectionNameChange = (index, newName) => {
    const updatedSections = [...sections];
    updatedSections[index].name = newName;
    setSections(updatedSections);
  };

  const handleToggleSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].enabled = !updatedSections[index].enabled;
    setSections(updatedSections);
  };

  const handleSave = () => {
    // Perform save operation
    console.log('Saving changes...');
  };

  const handleMenuClick = (index) => {
    // Handle the menu button click event here
    // You can perform the drag and drop logic or any other menu-related functionality
    console.log(`Menu clicked for section at index ${index}`);
  };
  

  return (
    <div>
      <h1 className=''>Resume Builder</h1>
      {sections.map((section, index) => (
        <div
          key={section.id}
          draggable
          onDragStart={(e) => handleDragStart(e, section.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            className="hamburger"
            style={{
              width: '25px',
              height: '20px',
              cursor: 'grab',
              marginRight: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
          </div>
          <span>{section.name}</span>
          <button onClick={() => handleSectionNameChange(index, prompt('Enter new name:'))}>Edit</button>
          <div className={`toggle-switch ${section.enabled ? 'violet' : 'grey'}`} onClick={() => handleToggleSection(index)}>
  <div className="slider"></div>
</div>

        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ResumeBuilder;
