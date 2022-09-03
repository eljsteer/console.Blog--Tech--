const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  const validateEmail = validator.isEmail(email);

  if (validator.isEmpty(email)) {
  alert('Please enter your Email');
  } else if (validator.isEmpty(password)) {
  alert('Please enter a Password');
  } else if(!validateEmail) {
    alert("Email is not valid, Please enter a valid Email")
  } else if (email && password) {
  // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(`\n Incorrect Email or Password'`);
    }
  };
};
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);