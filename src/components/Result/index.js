import React from 'react';
import './styles.scss';

export default function Result({selectedImage, textResult}) {
  return (
    <div className="result">
        {selectedImage && (
          <div className="box-image">
            <img src={URL.createObjectURL(selectedImage)} alt="Thumbnail"/>
          </div>
        )}
        {textResult && (
        <div className="box-p">
          <p>{textResult}</p>
        </div>
      )}
    </div>
  )
}
