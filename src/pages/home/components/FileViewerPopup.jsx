import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function FileViewerPopup({showpop, onClose}) {
  const [isOpen, setIsOpen] = useState(true);
  const [fileUrl, setFileUrl] = useState("https://podcasts.ceu.edu/sites/podcasts.ceu.edu/files/sample.doc");

  return (
    <div>

      <Modal
        isOpen={true}
        onRequestClose={() => { setIsOpen(false); onClose(); }}
        style={{ content: { height: "80%", width: "80%", margin: "auto" } }}
      >
        <button onClick={() => {setIsOpen(false);onClose();}}>Close</button>
        
        <iframe
                  allowFullScreen
                  src={
                    fileUrl.includes(".doc")
                      ? "https://view.officeapps.live.com/op/embed.aspx?src=" +
                        fileUrl
                      : fileUrl
                  }
                  title=""
                  height="100%"
                  width="100%"
                />
        
      </Modal>
    </div>
  );
}
