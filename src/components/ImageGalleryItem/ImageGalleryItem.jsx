import { useState } from 'react';
import { Item, ItemImg } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';

export default function ImageGalleryItem({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Item className="gallery-item" key={item.id}>
        <ItemImg
          onClick={openModal}
          src={item.webformatURL}
          alt={item.tags}
          loading="lazy"
        />
        {isModalOpen && (
          <ModalWindow
            image={item}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
          />
        )}
      </Item>
    </>
  );
}
