import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs  } from 'react-pdf';
 


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;



Modal.setAppElement('#root');
 
export default function PdfPopupViewer({showpop, onClose}) {
  const [isOpen, setIsOpen] = useState(true);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => { 
    setIsOpen(true);
  }, [showpop]);
 
  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);
 
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={() => {setIsOpen(false); onClose();}} style={{
        content: { width: '80%', height: '80%', margin: 'auto' }
      }}>
        <button onClick={() =>  {setIsOpen(false); onClose();}}>Close</button>
        <Document
          file="https://www.orimi.com/pdf-test.pdf" // place the file in public folder or use a URL
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (_, i) => (
            <Page key={`page_${i + 1}`} pageNumber={i + 1} />
          ))}
        </Document>
      </Modal>
    </div>
  );
}