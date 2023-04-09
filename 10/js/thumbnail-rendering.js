const pictures = document.querySelector('.pictures');
import {renderFullPhoto} from './fullsize-rendering.js';
const templateContent = document.querySelector('#picture').content;
const templatePicture = templateContent.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const renderingPhotos = (ImagesData) => {
  ImagesData.forEach((data) => {
    const copyImage = templatePicture.cloneNode(true);
    copyImage.querySelector('.picture__img').src = data.url;
    copyImage.querySelector('.picture__likes').textContent = data.likes;
    copyImage.querySelector('.picture__comments').textContent = data.comments.length;
    pictureListFragment.append(copyImage);
    const openFullSize = () => renderFullPhoto(data);
    copyImage.addEventListener('click', openFullSize);
  });
  pictures.append(pictureListFragment);
};

export {renderingPhotos};
