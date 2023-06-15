import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './tailwind.css';
import { borderRadius, color, fontSize } from '@mui/system';
import Switch from "react-switch";
import { UilTimes } from '@iconscout/react-unicons';
import { UilCheck } from '@iconscout/react-unicons';
import { UilInfoCircle } from '@iconscout/react-unicons';

const ResumeBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Profile Summary', enabled: true, description: 'Your educational background and qualifications.', showDescription: false },
    { id: 2, name: 'Academic and Cocurricular Achievements', enabled: true, description: 'Your work experience and employment history.', showDescription: false },
    { id: 3, name: 'Summer Internship Experience', enabled: true, description: 'Your skills and areas of expertise.', showDescription: false },
    { id: 4, name: 'Work Experience', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
    { id: 5, name: 'Projects', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
    { id: 6, name: 'Certifications', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
    { id: 7, name: 'Leadership Position', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
    { id: 8, name: 'Extra Curricular', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
    { id: 9, name: 'Education', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
  ]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);

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

  const handleEditClick = (index, initialName) => {
    setEditingIndex(index);
    setEditedName(initialName);
  };

  const handleInfoClick = (index) => {
    const description = sections[index].description;
    setCurrentDescription(description);
    setShowDescriptionPopup(true);
  };

  const handleClosePopup = () => {
    setShowDescriptionPopup(false);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleNameSave = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].name = editedName;
    setSections(updatedSections);
    setEditingIndex(null);
    setEditedName('');
  };

  const handleSave = () => {
    // Perform save operation
    console.log('Saving changes...');
  };

  return (
    <div className='hero'>
    <div className='main'>
    <p className="sec">Select your sections</p>
    {sections.map((section, index) => (
      <><div
        key={section.id}
        draggable
        onDragStart={(e) => handleDragStart(e, section.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, index)}
        style={{
          fontSize: '18px',
          position: 'relative',
          display: 'flex',

          alignItems: 'center',
          width: '1200px',
          height: '50%',
          backgroundColor: editingIndex !== null && editingIndex !== index ? '#B6B6B6' : 'initial',
          marginBottom: '5px', // Spacing between rows
        }}
      >
        <div
          className="hamburger"
          style={{
            width: '18px',
            height: '12px',
            cursor: 'grab',
            display: 'flex',
            marginRight: '10px',
            marginBottom: '28px',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ width: '100%', height: '2px', background: '#000' }}></span>
          <span style={{ width: '100%', height: '2px', background: '#000' }}></span>
          <span style={{ width: '100%', height: '2px', background: '#000' }}></span>
        </div>
        <div className="section-description">
          <button className="info-button" onClick={() => handleInfoClick(index)} style={{ marginRight: '10px' }}>
            <UilInfoCircle size={20}></UilInfoCircle>
          </button>
          {section.showDescription && <p>{section.description}</p>}
        </div>
        {editingIndex === index ? (
          <div className='saving'>
            <input type="text" value={editedName} onChange={handleNameChange} />
            <div className='tog'>
              <button onClick={() => handleNameSave(index)} className='savemebtn' style={{ fontFamily: 'Inter', fontSize: '16px', border: 'none', background: 'none' }}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            {section.name}
            <div className='tog'>
              <button onClick={() => handleEditClick(index, section.name)} style={{ border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faPencilAlt} style={{ height: '20px' }} />
              </button>
            </div>
          </div>
        )}
        <div>
          <Switch
            className='j'
            offColor='#E6E6E6' onColor='#D0BCFF'
            offHandleColor='#8B8B8B' onHandleColor='#381E72'
            uncheckedIcon={false} checkedIcon={false}
            uncheckedHandleIcon={<UilTimes className="cross" style={{ color: 'white' }} />} checkedHandleIcon={<UilCheck className="check" style={{ color: 'white' }} />}
            checked={section.enabled} onChange={() => handleToggleSection(index)} />
        </div>
      </div>
      </>
    ))}
    {showDescriptionPopup && (
      <div className="dialog-overlay">
        <div className="dialog">
          <button className="close-button" onClick={handleClosePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <p className="description-text">{currentDescription}</p>
        </div>
      </div>
      
    )}
    <div className='save'>
      <button onClick={handleSave} style={{ backgroundColor: '#8A4893', fontSize: '16px', width: '429px', height: '52px', color: 'white', borderRadius: '10px', border: 'none' }}>Save and Next</button>
    </div>
  </div>
  </div>
);
};
    

export default ResumeBuilder;
