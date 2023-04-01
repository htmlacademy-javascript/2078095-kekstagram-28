import { photosDescriptions } from './thumbnail-rendering.js';
import { isEscapeKey } from './util.js';

const imagesContainer = document.querySelector('.pictures');

const imagesData = photosDescriptions;

const bigPicture = document.querySelector('.big-picture');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageModal();
  }
};

function openImageModal(evt) {
  if (evt.target.matches('.picture__img')) {
    const userPicture = evt.target.closest('.picture');
    const thumbnails = Array.from(imagesContainer.querySelectorAll('.picture'));
    const index = thumbnails.indexOf(userPicture);
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = imagesData[index].url;
    bigPicture.querySelector('.likes-count').textContent = imagesData[index].likes;
    bigPicture.querySelector('.social__comments').innerHTML = '';

    bigPicture.querySelector('.social__caption').textContent = imagesData[index].description;

    document.querySelector('body').classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);

    const commentMass = imagesData[index].comments.slice();
    const commentLoader = bigPicture.querySelector('.comments-loader');

    const currentCommentCount = bigPicture.querySelector('.current-comments-count');
    bigPicture.querySelector('.comments-count').textContent = imagesData[index].comments.length;

    commentLoader.classList.remove('hidden');
    let count = 0;
    const loadComments = function () {

      const commentsToShow = commentMass.splice(0, 5); // удаляем и получаем первые 5 комментариев
      commentsToShow.forEach((comment) => {
        addComment(comment);
        count++;
      });

      currentCommentCount.textContent = count;

      if (commentMass.length === 0) {
        commentLoader.classList.add('hidden');
      }
    };

    commentLoader.addEventListener('click', loadComments);

    loadComments();
  }
}

function addComment(commentData){

  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const userAvatar = document.createElement('img');
  userAvatar.classList.add('social__picture');
  userAvatar.src = commentData.avatar;
  userAvatar.alt = commentData.name;
  userAvatar.width = '35';
  userAvatar.height = '35';

  comment.append(userAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = commentData.message;

  comment.append(commentText);

  bigPicture.querySelector('.social__comments').append(comment);
}


function closeImageModal() {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

imagesContainer.addEventListener('click', openImageModal);

closeButton.addEventListener('click', closeImageModal);
