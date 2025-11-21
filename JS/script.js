document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');

  const usernameError = document.getElementById('usernameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  const statusMessage = document.getElementById('statusMessage');

  const storedUsername = localStorage.getItem('savedUsername');
  if (storedUsername) {
    usernameInput.value = storedUsername;
  }

  function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.classList.remove('valid');
    inputElement.classList.add('invalid');
  }

  function clearError(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    inputElement.classList.add('valid');
  }

  function validateUsername() {
    const validity = usernameInput.validity;
    const value = usernameInput.value.trim();

    if (validity.valueMissing || value === '') {
      showError(usernameInput, usernameError, 'Username is required.');
      return false;
    }

    if (validity.tooShort) {
      showError(usernameInput, usernameError, 'Username must be at least 3 characters.');
      return false;
    }

    if (validity.patternMismatch) {
      showError(
        usernameInput,
        usernameError,
        'Username can only contain letters, numbers, and underscores.'
      );
      return false;
    }

    clearError(usernameInput, usernameError);
    return true;
  }

  function validateEmail() {
    const validity = emailInput.validity;

    if (validity.valueMissing) {
      showError(emailInput, emailError, 'Email is required.');
      return false;
    }

    if (validity.typeMismatch) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }

    clearError(emailInput, emailError);
    return true;
  }

  function validatePassword() {
    const validity = passwordInput.validity;
    const value = passwordInput.value;

    if (validity.valueMissing || value === '') {
      showError(passwordInput, passwordError, 'Password is required.');
      return false;
    }

    if (validity.tooShort) {
      showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
      return false;
    }

    if (validity.patternMismatch) {
      showError(
        passwordInput,
        passwordError,
        'Password must have an uppercase letter, a lowercase letter, and a number.'
      );
      return false;
    }

    clearError(passwordInput, passwordError);
    return true;
  }

  function validateConfirmPassword() {
    const value = confirmPasswordInput.value;

    if (!value) {
      showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
      return false;
    }

    if (value !== passwordInput.value) {
      showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
      return false;
    }

    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
  }

  usernameInput.addEventListener('input', validateUsername);
  emailInput.addEventListener('input', validateEmail);

  passwordInput.addEventListener('input', function () {
    validatePassword();
    if (confirmPasswordInput.value !== '') {
      validateConfirmPassword();
    }
  });

  confirmPasswordInput.addEventListener('input', validateConfirmPassword);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (statusMessage) {
      statusMessage.textContent = '';
      statusMessage.classList.remove('success', 'error');
    }

    const usernameValid = validateUsername();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const confirmValid = validateConfirmPassword();

    if (usernameValid && emailValid && passwordValid && confirmValid) {
      const usernameValue = usernameInput.value.trim();

      try {
        localStorage.setItem('savedUsername', usernameValue);
      } catch (e) {
        console.log('Could not save to localStorage:', e);
      }

      if (statusMessage) {
        statusMessage.textContent = 'Registration successful!';
        statusMessage.classList.add('success');
      }

      form.reset();
      usernameInput.value = usernameValue;

      const inputs = [usernameInput, emailInput, passwordInput, confirmPasswordInput];
      const errors = [usernameError, emailError, passwordError, confirmPasswordError];

      inputs.forEach(function (input) {
        input.classList.remove('valid', 'invalid');
      });

      errors.forEach(function (errorSpan) {
        errorSpan.textContent = '';
      });
    } else {
      if (statusMessage) {
        statusMessage.textContent = 'Please fix the highlighted errors and try again.';
        statusMessage.classList.add('error');
      }

      const fields = [
        { input: usernameInput, error: usernameError },
        { input: emailInput, error: emailError },
        { input: passwordInput, error: passwordError },
        { input: confirmPasswordInput, error: confirmPasswordError }
      ];

      for (let i = 0; i < fields.length; i += 1) {
        if (fields[i].error.textContent !== '') {
          fields[i].input.focus();
          break;
        }
      }
    }
  });
});
