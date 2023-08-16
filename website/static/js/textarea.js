const textareas = document.querySelectorAll('.my-textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
  });
});

function showCard(event) {
  // Get the element that triggered the event
  var target = event.target;
  
  // Find the corresponding card
  var card = target.nextElementSibling;
  
  // Show the card
  card.style.display = 'block';
}

function saveChanges() {
  // Hide all edit cards
  var cards = document.querySelectorAll('.editcard');
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = 'none';
  }
}

document.addEventListener('click', dissappear);


function dissappear(event) {
  // Check if the click event target is inside an alert element
  if (!event.target.closest('.alert')) {
    // If not, hide all alerts
    var alerts = document.querySelectorAll('.alert');
    for (var i = 0; i < alerts.length; i++) {
      alerts[i].style.display = 'none';
    }
    console.log('hide');
  }
}