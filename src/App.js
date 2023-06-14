import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './tailwind.css';


const ResumeBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Education', enabled: true, description: 'Your educational background and qualifications.', showDescription: false },
    { id: 2, name: 'Experience', enabled: true, description: 'Your work experience and employment history.', showDescription: false },
    { id: 3, name: 'Skills', enabled: true, description: 'Your skills and areas of expertise.', showDescription: false },
    { id: 5, name: 'Projects', enabled: true, description: 'Notable projects you have worked on.', showDescription: false },
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
    <div>
      <h1 className=''>Resume Builder</h1>
      {sections.map((section, index) => (
        <div
          key={section.id}
          draggable
          onDragStart={(e) => handleDragStart(e, section.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: editingIndex !== null && editingIndex !== index ? 'grey' : 'initial',
          }}
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
              justifyContent: 'space-between',
            }}
          >
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
            <span style={{ width: '100%', height: '3px', background: '#000' }}></span>
          </div>
          <div className="section-description">
          <button className="info-button" onClick={() => handleInfoClick(index)}>
          <FontAwesomeIcon icon={faCircleInfo} />
</button>
{section.showDescription && <p>{section.description}</p>}

    </div>
          {editingIndex === index ? (
            <div>
              <input type="text" value={editedName} onChange={handleNameChange} />
              <button onClick={() => handleNameSave(index)}  style={{ border: 'none', background: 'none' }}>
                Save
              </button>
            </div>
          ) : (
            <div>
              {section.name}
              <button onClick={() => handleEditClick(index, section.name)} style={{ border: 'none', background: 'none' }}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
          <div className={`toggle-switch ${section.enabled ? 'violet' : 'grey'}`} onClick={() => handleToggleSection(index)}>
            <div className="slider"></div>
          </div>
        </div>
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
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ResumeBuilder;
