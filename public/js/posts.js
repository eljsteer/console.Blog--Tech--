const blogPostHandler = async (event) => {
  try {
  // Collect values from the login form
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const success = document.querySelector('#success');
  const createPost = document.querySelector('.cont-create-post');

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      console.log("console.blog(Posted)");
      success.classList.add("show");
    } else {
      alert(response.statusText);
    }
  }
  function hideCreatePost () {
    createPost.setAttribute("class", "hide");
  };
  hideCreatePost()

  } catch (err) {
  console.log(err)
  };
};

document
  .querySelector('#create-post')
  .addEventListener('click', blogPostHandler);