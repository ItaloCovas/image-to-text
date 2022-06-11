import React, { useEffect, useState, useCallback } from 'react';
import Input from './components/Input';
import Presentation from './components/Presentation';
import Result from './components/Result';
import { createWorker } from 'tesseract.js';
import Loader from './components/Loader';


function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textResult, setTextResult] = useState("");

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    switch (navigator.language) {
      case 'en-US':
        async function enUsLoader() {
          setLoading(true);
          await worker.load();
          await worker.loadLanguage("eng");
          await worker.initialize("eng");
          const { data } = await worker.recognize(selectedImage);
          setTextResult(data.text);
          setLoading(false);
          await worker.terminate();
        }
        enUsLoader();
        break;
      case 'pt-BR':
        async function ptBrLoader() {
          setLoading(true);
          await worker.load();
          await worker.loadLanguage("por");
          await worker.initialize("por");
          const { data } = await worker.recognize(selectedImage);
          setTextResult(data.text);
        }
        ptBrLoader();
        break;
      default:
        enUsLoader();
        break;
    }
  }, [worker, selectedImage]);

  useEffect(() => {
    if (selectedImage) {
      setTextResult("");
      convertImageToText();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  return (
    <div className="App">
      <Presentation />
      <Input setSelectedImage={setSelectedImage} setTextResult={setTextResult} />
      {loading && <Loader />}
      <Result selectedImage={selectedImage} textResult={textResult} />
    </div>
  );
}

export default App;
