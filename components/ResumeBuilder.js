import React, { useState } from 'react';

const ResumeBuilder = () => {
  const [sections, setSections] = useState([
    { id: 1, name: 'Education', enabled: true },
    { id: 2, name: 'Experience', enabled: true },
    { id: 3, name: 'Skills', enabled: true },
    { id: 4, name: 'Projects', enabled: true },
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

  return (
    <div>
      <h1>Resume Builder</h1>
      <ul>
        {sections.map((section, index) => (
          <li key={section.id} draggable onDragStart={(e) => handleDragStart(e, section.id)} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, index)}>
            <span>{section.name}</span>
            <button onClick={() => handleSectionNameChange(index, prompt('Enter new name:'))}>Edit</button>
            <label>
              <input type="checkbox" checked={section.enabled} onChange={() => handleToggleSection(index)} />
              Toggle
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ResumeBuilder;
