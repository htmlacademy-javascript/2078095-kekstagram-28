const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT = 100;

const uploadFormModal = document.querySelector('.img-upload__overlay');
const scaleSmaller = uploadFormModal.querySelector('.scale__control--smaller');
const scaleBigger = uploadFormModal.querySelector('.scale__control--bigger');
const scaleInput = uploadFormModal.querySelector('.scale__control--value');
const imagePreview = uploadFormModal.querySelector ('.img-upload__preview');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const resetScale = () => scaleImage(DEFAULT);

const onScaleSmaller = () =>{

  const currentValue = parseInt(scaleInput.value,10);
  let newValue = currentValue - STEP;

  if (newValue < MIN_VALUE){
    newValue = MIN_VALUE;
  }
  scaleImage(newValue);
};

const onScaleBigger = () =>{
  const currentValue = parseInt(scaleInput.value,10);

  let newValue = currentValue + STEP;

  if (newValue > MAX_VALUE){
    newValue = MAX_VALUE;
  }
  scaleImage(newValue);
};

scaleSmaller.addEventListener('click', onScaleSmaller);
scaleBigger.addEventListener('click', onScaleBigger);

export {resetScale};
