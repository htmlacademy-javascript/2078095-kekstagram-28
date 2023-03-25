import {getRandomInteger, getRandomArrayElement,createRandomId} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Ну, чё уставились?',
  'Отведай-ка силушки богатырской!',
  'Ооо! Туда нам надо',
  'Не знаешь, что делать? Упал — отжался!',
  'И, кстати! Я на этой картинке просто плохо получился'
];

const NAMES = [
  'Тихон',
  'Алеша',
  'Добрыня',
  'Илья',
  'Юлий',
  'Влади́мир Кра́сно Со́лнышко',
  'Калыван',
  'Тугарин'
];

const DESCRIPTION_COUNT = 25;
const AVATARS = 6;

const createId = createRandomId(1,25);
const createCommentId = createRandomId(1,1000);
const createUrlId = createRandomId(1,25);

const getComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1,AVATARS) }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const getImageDescription = () => ({
  id: createId(),
  url: `photos/${ createUrlId() }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15,200),
  comments: Array.from({length: getRandomInteger(1,5)}, getComment),
});

const getImageDescriptions = () => Array.from({length: DESCRIPTION_COUNT}, getImageDescription);

export {getImageDescriptions};
