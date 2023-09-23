$(document).ready(function() {
    $('.add-list-form textarea').val('');
    $('.add-item-form textarea').val('');
});

// Create new lists
$('.add-list-form').on('submit', function(event) {
    event.preventDefault();
    let name = $(this).find('textarea[name="name"]').val();
    $.ajax({
        url: '/add_list',
        type: 'POST',
        data: { name: name },
        success: function(data) {
            let newList = $('<li data-tilt data-tilt-reverse="true" data-tilt-scale="1.01" data-tilt-max="1" data-tilt-speed="800" data-tilt-perspective="900" class="todo-list" data-id="' + data.id + '"><h2 class="list-name" data-id="' + data.id + '">' + name + '</h2><div data-tilt data-tilt-reverse="true" data-tilt-scale="1.01" data-tilt-max="1" data-tilt-speed="800" data-tilt-perspective="400" class="editcard" style="display: none;"><form class="edit-list-form"><textarea required name="name">' + name + '</textarea><button class="btn" type="submit">Save</button></form><form class="delete-list-form"><button class="btn" type="submit">Delete</button></form></div><ul class="items"></ul><form class="add-item-form"><textarea required name="description" placeholder="Nothing to do?"></textarea><button class="btn" type="submit">Add Item</button></form></li>');
            newList.find('.list-name').html(name.replace(/\n/g, '<br>'));
            $('#lists').append(newList).masonry('appended', newList);

            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');

            $(this).find('textarea[name="name"]').val('');

            // Initialize Vanilla Tilt on the added elements
            VanillaTilt.init(newList[0]);
            VanillaTilt.init(newItem.find('.editcard')[0]);
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
            let $list = $(event.target).closest('.todo-list');
            $list.find('.list-name').html(name.replace(/\n/g, '<br>'));
            $list.find('.editcard').hide();
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
            let newItem = $('<li class="todo-item" data-id="' + data.id + '"><span class="item-description">' + description + '</span><input type="checkbox" class="item-checkbox"><div class="editcard" data-tilt style="display: none;" data-tilt-reverse="true" data-tilt-scale="1.01" data-tilt-max="1" data-tilt-speed="800" data-tilt-perspective="400"><form class="edit-item-form"><textarea required name="description" placeholder="Edit me...">' + description + '</textarea><button class="btn" type="submit">Save</button></form><form class="delete-item-form"><button class="btn" type="submit">Delete</button></form></div></li>');
            newItem.find('.item-description').html(description.replace(/\n/g, '<br>'));
            let $items = $(event.target).siblings('.items');
            $items.append(newItem);
            $('#lists').masonry('appended', newItem);
            $('#lists').masonry('reloadItems');
            $('#lists').masonry('layout');
            $(event.target).find('textarea[name="description"]').val('');

            // Initialize Vanilla Tilt on the added editcard
            VanillaTilt.init(newItem.find('.editcard')[0]);
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
            $item.find('.item-description').html(description.replace(/\n/g, '<br>'));
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
        }
    });
});

// Check/uncheck item
$(document).on('change', '.item-checkbox', function() {
    let $checkbox = $(this);
    let itemId = $checkbox.closest('.todo-item').data('id');
    let checked = $checkbox.prop('checked');
    
    $.ajax({
        url: '/check_item/' + itemId,
        type: 'POST',
        data: { checked: checked },
        success: function(data) {
            animateCheckbox($checkbox, checked);
        }
    });
});

function animateCheckbox($checkbox, checked) {
    let $checkboxIcon = $checkbox.siblings('.checkbox-icon');
    
    if (checked) {
        $checkboxIcon.animate({ opacity: 1 }, 300);
    } else {
        $checkboxIcon.animate({ opacity: 0 }, 300);
    }
}

// Show edit window for list name
$(document).on('click', '.list-name', function() {
    let $editCard = $(this).siblings('.editcard');
    $('.editcard').not($editCard).hide();
    $editCard.show();
    let currentName = $(this).html().replace(/<br>/g, '\n');
    $editCard.find('textarea[name="name"]').val(currentName);
});

// Show edit window for item description
$(document).on('click', '.item-description', function() {
    let $editCard = $(this).siblings('.editcard');
    $('.editcard').not($editCard).hide();
    $editCard.show();
    let currentDescription = $(this).html().replace(/<br>/g, '\n');
    $editCard.find('textarea[name="description"]').val(currentDescription);
});

newItem.find('.item-description').css('white-space', 'pre-line');
