// Create new lists
$('.add-list-form').on('submit', function(event) {
    event.preventDefault();
    let name = $(this).find('textarea[name="name"]').val();
    $.ajax({
        url: '/add_list',
        type: 'POST',
        data: { name: name },
        success: function(data) {
            // Create a new list element
            let newList = $('<li class="todo-list" data-id="' + data.id + '"><h2 class="list-name" data-id="' + data.id + '"></h2><div class="editcard" style="display: none;"><form class="edit-list-form"><textarea required name="name"></textarea><button type="submit">Save</button></form><form class="delete-list-form"><button type="submit">Delete</button></form></div><ul class="items"></ul><form class="add-item-form"><textarea required name="description" placeholder="Item description"></textarea><button type="submit">Add Item</button></form></li>');
            newList.find('.list-name').text(name);  // Set the list name with line breaks
            $('#lists').append(newList).masonry('appended', newList);

            // Example: Initialize the Masonry layout after adding the new list
            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');

            // Clear the form input
            $(this).find('textarea[name="name"]').val('');
        }
    });
});

// Edit list name
$(document).on('submit', '.edit-list-form', function(event) {
    event.preventDefault();
    let listId = $(this).closest('.todo-list').data('id');
    let name = $(this).find('textarea[name="name"]').val();
    $.ajax({
        url: '/edit_list/' + listId,
        type: 'POST',
        data: { name: name },
        success: function(data) {
            $(event.target).closest('li').find('.list-name').text(name);
            $(event.target).closest('.editcard').hide();
            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');
        }
    });
});

// Delete list
$(document).on('submit', '.delete-list-form', function(event) {
    event.preventDefault();
    let listId = $(this).closest('.todo-list').data('id');
    $.ajax({
        url: '/delete_list/' + listId,
        type: 'POST',
        success: function(data) {
            let $list = $(event.target).closest('li');
            $list.remove();
            $('#lists').masonry('remove', $list).masonry('layout').masonry('reloadItems');
            // Handle success (e.g., remove the list from the DOM)
        }
    });
});

// Create a new item
$(document).on('submit', '.add-item-form', function(event) {
    event.preventDefault();
    let listId = $(this).closest('.todo-list').data('id');
    let description = $(this).find('textarea[name="description"]').val();
    $.ajax({
        url: '/add_item/' + listId,
        type: 'POST',
        data: { description: description },
        success: function(data) {
            // Handle success (e.g., display a success message)
            let newItem = $('<li class="todo-item" data-id="' + data.id + '"><span class="item-description"></span><input type="checkbox" class="item-checkbox"><div class="editcard" style="display: none;"><form class="edit-item-form"><textarea required name="description" placeholder="edit me..."></textarea><button type="submit">Save</button></form><form class="delete-item-form"><button type="submit">Delete</button></form></div></li>');
            newItem.find('.item-description').text(description);  // Set the item description with line breaks
            let $items = $(event.target).siblings('.items');
            $items.append(newItem);
            $('#lists').masonry('appended', newItem);
            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');
            $(event.target).find('textarea[name="description"]').val('');
        }
    });
});

// Edit item description
$(document).on('submit', '.edit-item-form', function(event) {
    event.preventDefault();
    let itemId = $(this).closest('.todo-item').data('id');
    let description = $(this).find('textarea[name="description"]').val();
    $.ajax({
        url: '/edit_item/' + itemId,
        type: 'POST',
        data: { description: description },
        success: function(data) {
            let $item = $(event.target).closest('li');
            $item.find('.item-description').text(description);
            $item.find('.editcard').hide();
            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');
        }
    });
});

// Delete item
$(document).on('submit', '.delete-item-form', function(event) {
    event.preventDefault();
    let itemId = $(this).closest('.todo-item').data('id');
    $.ajax({
        url: '/delete_item/' + itemId,
        type: 'POST',
        success: function(data) {
            $(event.target).closest('li').remove();
            $('#lists').masonry('layout');
            // Handle success (e.g., remove the item from the DOM)
        }
    });
});

// Check/uncheck item
$(document).on('change', '.item-checkbox', function() {
    let itemId = $(this).closest('.todo-item').data('id');
    let checked = $(this).prop('checked');
    $.ajax({
        url: '/check_item/' + itemId,
        type: 'POST',
        data: { checked: checked },
        success: function(data) {
            // Handle success (e.g., display a success message)
        }
    });
});

// Show edit window for list name
$(document).on('click', '.list-name', function() {
    let $editCard = $(this).siblings('.editcard');
    // Hide all edit windows
    $('.editcard').hide();
    // Show the edit window for the clicked list name
    $editCard.show();
    // Set the textarea value to the current list name
    let currentName = $(this).text();
    $editCard.find('textarea[name="name"]').val(currentName);
});

// Show edit window for item description
$(document).on('click', '.item-description', function() {
    let $editCard = $(this).siblings('.editcard');
    // Hide all edit windows
    $('.editcard').hide();
    // Show the edit window for the clicked item description
    $editCard.show();
    // Set the textarea value to the current item description
    let currentDescription = $(this).text();
    $editCard.find('textarea[name="description"]').val(currentDescription);
});