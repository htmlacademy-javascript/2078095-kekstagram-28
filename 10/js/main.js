import './fullsize-rendering.js';
import './effects.js';
import './scale.js';
import {getData, sendData} from './api.js';
import {renderingPhotos} from './thumbnail-rendering.js';
import { showAlert } from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {closeEditingForm, setOnFormSubmit} from './form-validation.js';

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
} catch (err) {

  showAlert(err);
}


