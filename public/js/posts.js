const blogPostHandler = async (event) => {

  // Collect values from the login form
  const movie = document.querySelector('#movie-id').value.trim();
  const review = document.querySelector('#review-descr').value.trim();
  const rating = document.querySelector('#rating-value').value.trim();
  const success = document.querySelector('#success')

  if (Title && Content) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      body: JSON.stringify({ movie, review, rating }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      console.log("console.blog(Posted)");
      success.setAttribute("class", "show site-text");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#add-blogpost')
  .addEventListener('click', blogPostHandler);