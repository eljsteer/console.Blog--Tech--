const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();

  const validateEmail = validator.isEmail(email);
  const validateUsername = validator.isAlphanumeric(username);
  console.log(validateEmail);

  if (validator.isEmpty(name)) { 
    alert('Please enter your Name');
  } else if (validator.isEmpty(email)) {
    alert('Please enter your Email');
  } else if (validator.isEmpty(password)) {
    alert('Please enter a Password');
  } else if (validator.isEmpty(username)) {
    alert('Please enter a username');
  } else {

    if(!validateEmail) {
      alert("Email is not Valid")
    } else if(!validateUsername) {
      alert("Please use AlphaNumeric Characters Only (a-z, A-Z, 0-9).")
    } else if (name && email && password && username) {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password, username }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/profile');
        } else {
          alert(`${response.statusText} Check Server or API for error`);
        }
      };
    };
  };


document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

