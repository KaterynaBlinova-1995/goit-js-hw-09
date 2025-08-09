let formData = {
  email: '',
  message: '',
};

document.addEventListener('DOMContentLoaded', () => {
  const formElem = document.querySelector('.feedback-form');

  const savedData = getFromLS('feedbackFromState');
  if (
    savedData &&
    typeof savedData === 'object' &&
    'email' in savedData &&
    'message' in savedData
  ) {
    formData = savedData;
    formElem.elements.email.value = savedData.email || '';
    formElem.elements.message.value = savedData.message || '';
  }

  formElem.addEventListener('input', e => {
    const { email, message } = formElem.elements;

    formData.email = email.value;
    formData.message = message.value;

    saveToLS('feedbackFromState', formData);
  });

  formElem.addEventListener('submit', e => {
    e.preventDefault();

    const emailValue = formElem.elements.email.value.trim();
    const messageValue = formElem.elements.message.value.trim();

    if (emailValue === '' || messageValue === '') {
      alert('Please fill in all fields');
      return;
    }

    formData.email = emailValue;
    formData.message = messageValue;

    console.dir(formData);

    localStorage.removeItem('feedbackFromState');
    formElem.reset();
    formData = {
      email: '',
      message: '',
    };

    alert('Message sent successfully!');
  });
});

function saveToLS(key, value) {
  try {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
  } catch (err) {
    console.error('Save to localStorage failed:', err);
  }
}

function getFromLS(key, defaultValue = {}) {
  try {
    const jsonData = localStorage.getItem(key);
    return JSON.parse(jsonData) || defaultValue;
  } catch {
    return defaultValue;
  }
}
