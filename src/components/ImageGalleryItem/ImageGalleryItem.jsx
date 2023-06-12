import { useState } from 'react';
import { Item, ItemImg } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';

export default function ImageGalleryItem ({item}) {
  // state = {
  //   isModalOpen: false,
  // };
const [isModalOpen, setIsModalOpen] = useState("false")
  
  const openModal = (isModalOpen) => {
    // this.setState({ isModalOpen: true });
    setIsModalOpen(true)
  };

  const closeModal = (isModalOpen) => {
    // this.setState({ isModalOpen: false });
    setIsModalOpen(isModalOpen)
  };

  
    // const { item } = this.props;
    // const { isModalOpen } = this.state;

    return (
      <>
        <Item className="gallery-item" key={item.id} >
          <ItemImg onClick={openModal} src={item.webformatURL} alt={item.tags} loading="lazy" />
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

