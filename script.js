document.addEventListener('DOMContentLoaded', function() {
  // Define the loadEssay function
  function loadEssay(filename) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const essayContent = xhr.responseText;
          document.getElementById('essayContent').innerHTML = window.marked(essayContent);
        } else {
          document.getElementById('essayContent').innerHTML = 'Error loading the essay.';
        }
      }
    };
    xhr.open('GET', 'essays/' + filename, true);
    xhr.send();
  }

  // The rest of your code (if any) goes here
  // ...
});

