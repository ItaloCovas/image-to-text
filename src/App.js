import React, {useEffect, useState, useCallback} from 'react';
import Input from './components/Input';
import Presentation from './components/Presentation';
import Result from './components/Result';
import {createWorker} from 'tesseract.js';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  
  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if(navigator.language === "en-US") {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const { data } = await worker.recognize(selectedImage);
      await worker.terminate();
      setTextResult(data.text);
    }
    if(navigator.language === "pt-BR") {
      await worker.load();
      await worker.loadLanguage("por");
      await worker.initialize("por");
      const { data } = await worker.recognize(selectedImage);
      setTextResult(data.text);
    }
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText]);

  return (
    <div className="App">
      <Presentation />
      <Input setSelectedImage={setSelectedImage} setTextResult={setTextResult}/>
      <Result selectedImage={selectedImage} textResult={textResult}/>
    </div>
  );
}

export default App;
