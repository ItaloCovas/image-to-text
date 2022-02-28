import React from 'react';
import './styles.scss';

export default function Input({setSelectedImage, setTextResult}) {

  function handleImageChange(e) {
    if(e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("");
    }
  }

  return (
    <div className="input-wrapper">
      <label htmlFor="upload">
        <input type="file" id="upload" accept="image/*" onChange={handleImageChange}/>
        <span className="file-custom"></span>
      </label>
      
    </div>
  )
}
