import { isEscapeKey } from './util.js';
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');

const commentLoader = bigPicture.querySelector('.comments-loader');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const closeButton = document.querySelector('.big-picture__cancel');
const socialDescription = document.querySelector('.social__caption');

const commentList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');

let commentsToShow = 0;
let comments = [];
const COMMENTS_STEP = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey) {
    evt.preventDefault();
    closeImageModal();
  }
};

function closeImageModal() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  commentsToShow = 0;
}

function addListComments (data) {
  const comment = commentItem.cloneNode(true);

  comment.querySelector('.social__picture').src = data.avatar;
  comment.querySelector('.social__picture').alt = data.name;
  comment.querySelector('.social__text').textContent = data.message;

  return comment;
}

const renderComments = () => {
  commentsToShow += COMMENTS_STEP;

  if (commentsToShow >= comments.length) {
    commentLoader.classList.add('hidden');
    commentsToShow = comments.length;
  } else {
    commentLoader.classList.remove('hidden');
  }

  const documentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsToShow; i++) {
    const commentElement = addListComments(comments[i]);
    documentFragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(documentFragment);
  socialCommentCount.innerHTML = `${commentsToShow} из <span class="comments-count">${comments.length}</span> комментариев`;
};

function renderFullPhoto (data) {

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  bigPictureImg.src = data.url;
  likesCount.textContent = data.likes;
  socialDescription.textContent = data.description;
  document.addEventListener('keydown', onDocumentKeydown);

  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
}

commentLoader.addEventListener('click', renderComments);
closeButton.addEventListener('click', closeImageModal);

export {renderFullPhoto};
