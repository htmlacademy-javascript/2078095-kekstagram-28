const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector ('.img-upload__preview');

const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT = 100;

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onScaleSmaller = () =>{

  scaleBigger.disabled = false;
  const currentValue = parseInt(scaleInput.value,10);
  const newValue = currentValue - STEP;
  scaleImage(newValue);

  if (newValue === MIN_VALUE){
    scaleSmaller.setAttribute('disabled',true);
  }
};

const onScaleBigger = () =>{
  const currentValue = parseInt(scaleInput.value,10);
  if (currentValue === MAX_VALUE){
    scaleBigger.setAttribute('disabled',true);
    return;
  }

  scaleSmaller.disabled = false;
  const newValue = currentValue + STEP;
  scaleImage(newValue);

  if (newValue === MAX_VALUE){
    scaleBigger.setAttribute('disabled',true);
  }
};

scaleSmaller.addEventListener('click', onScaleSmaller);
scaleBigger.addEventListener('click', onScaleBigger);

const resetScale = () => scaleImage(DEFAULT);

export {resetScale};
