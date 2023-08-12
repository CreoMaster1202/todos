var textarea = document.querySelector('textarea');
textarea.addEventListener('input', function() {
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight) + 'px';
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