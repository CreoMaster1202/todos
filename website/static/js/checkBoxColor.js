var checkboxes = document.querySelectorAll('.item-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].value == 'O') {
            checkboxes[i].classList.add('completed');
        } else {
            checkboxes[i].classList.add('not-completed');
        }
    }