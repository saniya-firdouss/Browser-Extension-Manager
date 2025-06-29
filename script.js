//------Dark mode -----------
const toggleBtn = document.getElementById('dark-mode-btn');
const icons = toggleBtn.querySelectorAll('svg'); // Get both SVGs inside the button

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Toggle SVG visibility
  icons.forEach(icon => {
    if (icon.style.display === 'none') {
      icon.style.display = 'inline';
    } else {
      icon.style.display = 'none';
    }
  });
});
//------------------Extensions and filter js here----------------

const filterButtons = document.querySelectorAll('.filter-btn');
const filterMsg = document.getElementById('filter-msg');
function getExtensionCards() {
  return document.querySelectorAll('.extension1');
}


// 1. Setup toggle state and listener
getExtensionCards().forEach(card => {
  const toggle = card.querySelector('.toggle');
  if (!toggle) return;

  // Initialize status on load
  card.setAttribute('data-status', toggle.checked ? 'active' : 'inactive');

  toggle.addEventListener('change', () => {
    card.setAttribute('data-status', toggle.checked ? 'active' : 'inactive');
    applyFilter(getCurrentFilter());
  });
});

// 2. Filter button click logic
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    applyFilter(filter);
  });
});

//  3. Get current filter
function getCurrentFilter() {
  const activeBtn = document.querySelector('.filter-btn.active');
  return activeBtn ? activeBtn.dataset.filter : 'all';
}

// 4. Apply filter to cards
function applyFilter(filter) {
  let matchCount = 0;

  getExtensionCards().forEach(card => {
    const status = card.getAttribute('data-status');

    if (filter === 'all' || filter === status) {
      card.style.display = 'block';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Show/hide message
  if (matchCount === 0) {
    filterMsg.textContent = `No ${filter} extensions found.`;
    filterMsg.style.display = 'block';
  } else {
    filterMsg.style.display = 'none';
  }
}

//  5. Initial filter
applyFilter('all');

// Add remove button functionality
getExtensionCards().forEach(card => {
  const removeBtn = card.querySelector('.remove-btn');
  if (!removeBtn) return;

  removeBtn.addEventListener('click', () => {
    card.remove(); 
    applyFilter(getCurrentFilter()); 
  });
});
