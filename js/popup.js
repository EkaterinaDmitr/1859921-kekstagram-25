/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import {isEscapeKey} from './util.js';

const COMMENTS_LIMIT = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const fragment = document.createDocumentFragment();
const pageBody = document.querySelector('body');
const commentsShownCount = document.querySelector('.comments-show');

const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');

// eslint-disable-next-line no-unused-vars
const onLoadButtonClick = () => {
  if (commentsArray.length <= COMMENTS_LIMIT) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const onEscapePress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onButtonModalClose();
  }
};

const showBigPicture = (photo) => {
  let commetsToShow = COMMENTS_LIMIT;

  const onLoadButtonClick = () => {
    commetsToShow += COMMENTS_LIMIT;
    renderComments(socialComments, photo.comments.slice(0, commetsToShow));
    if (photo.comments.length <= commetsToShow) {
      commentsLoaderButton.classList.add('hidden');
      commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
    }
  };
  const onButtonModalClose = () => {
    bigPicture.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    document.removeEventListener('keyup', onEscapePress);
    bigPictureCancel.removeEventListener('click', onButtonModalClose);
    commentsLoaderButton.removeEventListener('click', onLoadButtonClick);
  };


  pageBody.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');

  socialComments.innerHTML = '';

  commentsShownCount.textContent = photo.comments.length;


  photo.comments.forEach((comment) => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');
    const commentImg = document.createElement('img');
    commentItem.appendChild(commentImg);
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;
    commentImg.width = 35;
    commentImg.height = 35;
    const commentText = document.createElement('p');
    commentItem.appendChild(commentText);
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;
    fragment.appendChild(commentItem);
  });

  socialComments.appendChild(fragment);

  document.addEventListener('keydown', onEscapePress);

  bigPictureCancel.addEventListener('click', onButtonModalClose);

  if (photo.comments.length > COMMENTS_LIMIT) {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', onLoadButtonClick);
  }
};

export {showBigPicture, pageBody, bigPicture,};
