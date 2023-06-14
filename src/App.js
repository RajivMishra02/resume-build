import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ResumeBuilder = () => {
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

  const handleToggleSection = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].enabled = !updatedSections[index].enabled;
    setSections(updatedSections);
  };

  const handleSave = () => {
    // Perform save operation
    console.log('Saving changes...');
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
          <button onClick={() => handleToggleSection(index)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <label>
            <input type="checkbox" checked={section.enabled} onChange={() => handleToggleSection(index)} />
            Toggle
          </label>
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ResumeBuilder;
