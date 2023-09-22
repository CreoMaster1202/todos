document.addEventListener('DOMContentLoaded', function() {
    var alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(function(alert) {
      setTimeout(function() {
        dissappear(alert);
      }, 5000); // Change the time (in milliseconds) to adjust how long the alerts should stay visible
    });
  });
  
  document.addEventListener('mouseup', function(event) {
    var alerts = document.querySelectorAll('.alert');
    var isClickedOnAlert = false;
    
    alerts.forEach(function(alert) {
      if (alert.contains(event.target)) {
        isClickedOnAlert = true;
        return;
      }
    });
    
    if (!isClickedOnAlert) {
      alerts.forEach(function(alert) {
        dissappear(alert);
      });
    }
  });
  
  function dissappear(element) {
    element.style.display = 'none';
  }