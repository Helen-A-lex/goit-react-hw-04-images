import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImageGallery = ({ items }) => {
  return (
    <>
      <ImgGallery className="gallery">
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ImgGallery>
    </>
  );
};
ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired
}