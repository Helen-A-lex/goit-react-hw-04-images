import { Component } from 'react';
import { Item, ItemImg } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { item } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <Item className="gallery-item" key={item.id} >
          <ItemImg onClick={this.openModal} src={item.webformatURL} alt={item.tags} loading="lazy" />
          {isModalOpen && (
            <ModalWindow
              image={item}
              closeModal={this.closeModal}
              isModalOpen={isModalOpen}
            />
          )}
        </Item>
      </>
    );
  }
}
