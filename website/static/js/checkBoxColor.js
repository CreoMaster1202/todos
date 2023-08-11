var checkboxes = document.querySelectorAll('.item-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value == 'V') {
            checkboxes[i].classList.add('completed');
        } else {
            checkboxes[i].classList.add('not-completed');
        }
    }