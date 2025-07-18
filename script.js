document.addEventListener('DOMContentLoaded', function () {
  // Load a Markdown essay and render it
  function loadEssay(filename) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const target = document.getElementById('essayContent');
        if (xhr.status === 200) {
          target.innerHTML = marked.parse(xhr.responseText);

          // After markdown is rendered, insert obfuscated email
          const emailSlot = document.getElementById('email-slot');
          if (emailSlot) {
            const user = 'paulo';
            const domain = 'email.com';
            emailSlot.innerHTML = `<a href="mailto:${user}@${domain}">${user}@${domain}</a>`;
          }
        } else {
          target.innerHTML = '<p>Error loading the essay.</p>';
        }
      }
    };
    xhr.open('GET', 'essays/' + filename, true);
    xhr.send();
  }

  // Extract the essay filename from the URL path
  function getEssayFromPath(path) {
    const slug = path.replace(/^\/+|\/+$/g, ''); // trim slashes
    return slug ? slug + '.md' : null;
  }

  // Load essay from a given path (used on page load and popstate)
  function navigateTo(path) {
    const essayFile = getEssayFromPath(path);
    if (essayFile) {
      loadEssay(essayFile);
    } else {
      document.getElementById('essayContent').innerHTML =
        '<p>Select an essay from the left column to read.</p>';
    }
  }

  // ✅ Handle GitHub Pages redirect from 404.html
  const savedPath = sessionStorage.getItem("redirectPath");
  if (savedPath) {
    sessionStorage.removeItem("redirectPath");
    history.replaceState(null, "", savedPath);
    navigateTo(savedPath);
  } else {
    navigateTo(window.location.pathname);
  }

  // Handle browser navigation (back/forward)
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
  });

  // Handle clicks on sidebar links
  document.getElementById('essayLinks').addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (link && link.dataset.essay) {
      event.preventDefault();
      const essayFile = link.dataset.essay;
      const slug = essayFile.replace(/\.md$/, '');
      history.pushState(null, '', '/' + slug);
      loadEssay(essayFile);
    }
  });
});
