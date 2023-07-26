document.addEventListener('DOMContentLoaded', function() {
  // Define the loadEssay function
  function loadEssay(filename) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const essayContent = xhr.responseText;
          document.getElementById('essayContent').innerHTML = marked(essayContent);
        } else {
          document.getElementById('essayContent').innerHTML = 'Error loading the essay.';
        }
      }
    };
    xhr.open('GET', 'essays/' + filename, true);
    xhr.send();
  }

  // Event delegation to handle click events on essay links
  document.getElementById('essayLinks').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const essayFilename = event.target.dataset.essay;
      loadEssay(essayFilename);
    }
  });

  // The rest of your code (if any) goes here
  // ...
});

