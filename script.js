// -------------------------------
// Utilities
// -------------------------------
const $ = (sel) => document.querySelector(sel);

// -------------------------------
// Theme handling
// -------------------------------
(function(){
  const storageKey = 'theme';
  const root = document.documentElement;
  const btn = $('#themeToggle');

  const systemPrefersLight = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  function effectiveTheme(){
    const stored = localStorage.getItem(storageKey);
    if (stored === 'light' || stored === 'dark') return stored;
    return systemPrefersLight() ? 'light' : 'dark';
  }

  function apply(theme){
    // Persist explicit theme choice
    root.setAttribute('data-theme', theme);
    if (btn){
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.textContent = theme === 'dark' ? '☾' : '☀︎';
      btn.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
    }
  }

  // Initialize
  const initial = effectiveTheme();
  // If user had an explicit choice saved, enforce it
  const saved = localStorage.getItem(storageKey);
  if (saved){ apply(saved); } else { apply(initial); }

  // Toggle on click
  if (btn){
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || effectiveTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      apply(next);
    });
  }

  // Optional: reflect system changes only when user hasn't chosen a theme
  if (window.matchMedia){
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)){
        apply(e.matches ? 'light' : 'dark');
      }
    });
  }
})();

// -------------------------------
// Footer year / updated & links
// -------------------------------
(function(){
  const y = $('#year');
  const u = $('#updated');
  if (y) y.textContent = new Date().getFullYear();
  if (u) u.textContent = new Date().toLocaleDateString(undefined,{year:'numeric',month:'short'});

  const cv = $('#cvLink');
  if (cv) cv.href = 'CV_Jaskirat_Singh_Sudan.pdf';
  // const scholar = $('#scholarLink');
  // if (scholar) scholar.href = 'https://scholar.google.com/citations?user=YOUR_ID';
})();
