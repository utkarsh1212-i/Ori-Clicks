import { useState } from "react";
import { Modal } from "react-bootstrap";

interface ChildComponentProps {
  imagename: {
    alt: string;
    avg_color: string;
    height: number;
    id: number;
    liked: boolean;
    photographer: string;
    photographer_id: number;
    photographer_url: string;
    src: {
      original: string;
      tiny: string;
      large: string;
      landscape: string;
      portrait: string;
      // Add other properties of the 'src' object if needed
    };
    url: string;
    width: number;
  };
}

const ImageCard: React.FC<ChildComponentProps> = ({ imagename }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openImageMoadal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="imagecards text-white" onClick={openImageMoadal}>
      <>
        <img
          src={imagename?.src?.tiny}
          alt={imagename?.alt}
          className="rounded"
        />
      </>
      <Modal
        show={openModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        closeButton
      >
        <img
          src={imagename?.src?.original}
          alt={imagename?.alt}
          className="rounded"
        />
      </Modal>
    </div>
  );
};

export default ImageCard;
