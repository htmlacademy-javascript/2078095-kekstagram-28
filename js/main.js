import './fullsize-rendering.js';
import './effects.js';
import './scale.js';
import {getData, sendData} from './api.js';
import {renderingPhotos,filterDefaultClick,filterRandomClick,filterDiscussedClick} from './thumbnail-rendering.js';
import { showAlert, debounce, RERENDER_DELAY} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {closeEditingForm, setOnFormSubmit} from './form-validation.js';
import './avatar.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeEditingForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderingPhotos(data);
  filterDefaultClick(debounce(
    () => renderingPhotos(data),
    RERENDER_DELAY
  ));
  filterRandomClick(debounce(
    () => renderingPhotos(data),
    RERENDER_DELAY
  ));
  filterDiscussedClick(debounce(
    () => renderingPhotos(data),
    RERENDER_DELAY
  ));
} catch (err) {

  showAlert(err);
}
