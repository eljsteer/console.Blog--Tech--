const newPostHandler = async (event) => {
  try {
    const postDisplay = document.querySelector('#post-display')
    const createPost = document.querySelector('#create-post');
    const newPost = document.querySelector('#new-post-bttn');

    newPost.classList.add("hide");
    createPost.classList.replace("hide", "show");
    postDisplay.classList.add("hide");
  } catch (err) {
    console.log(err)
    };
};

document
  .querySelector('#new-post-bttn')
  .addEventListener('click', newPostHandler);


const blogPostHandler = async (event) => {
  try {
  // Collect values from the login form
  const postDisplay = document.querySelector('#post-display');
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const success = document.querySelector('#success');
  const createPost = document.querySelector('#create-post');

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
      hideCreatePost()
    } else {
      alert(response.statusText);
    }
  }

  function hideCreatePost () {
    createPost.classList.replace("show","hide");
    postDisplay.classList.replace("hide", "show");
  };
  
  } catch (err) {
  console.log(err)
  };
};

document
  .querySelector('#create-post')
  .addEventListener('click', blogPostHandler);