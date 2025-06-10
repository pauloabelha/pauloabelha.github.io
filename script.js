document.addEventListener('DOMContentLoaded', function() {
  function loadEssay(filename) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const essayContent = xhr.responseText;
          document.getElementById('essayContent').innerHTML = marked.parse(essayContent);
        } else {
          document.getElementById('essayContent').innerHTML = '<p>Error loading the essay.</p>';
        }
      }
    };
    xhr.open('GET', 'essays/' + filename, true);
    xhr.send();
  }

  function getEssayFromPath(path) {
    const slug = path.replace(/^\/+|\/+$/g, ''); // remove leading/trailing slashes
    if (!slug) return null;
    return slug + '.md';
  }

  function navigateTo(path) {
    const essayFile = getEssayFromPath(path);
    if (essayFile) {
      loadEssay(essayFile);
    } else {
      document.getElementById('essayContent').innerHTML = '<p>Select an essay from the left column to read.</p>';
    }
  }

  // Initial load
  navigateTo(window.location.pathname);

  // Handle browser navigation (back/forward)
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
  });

  // Handle clicks on links
  document.getElementById('essayLinks').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const essayFile = event.target.dataset.essay; // e.g., homeopathy.md
      const slug = essayFile.replace(/\.md$/, '');  // e.g., homeopathy

      history.pushState(null, '', '/' + slug);
      loadEssay(essayFile);
    }
  });
});
