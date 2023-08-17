$(document).ready(function() {
    $('#add-list-form').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).find('input[name="name"]').val();
        $.post('/add_list', {name: name}, function(data) {
            var newList = $('<li data-id="' + data.id + '"><h2>' + name + '</h2><form class="add-item-form"><input type="text" name="description" placeholder="Item description"><button type="submit">Add Item</button></form><ul class="items"></ul></li>');
            $('#lists').append(newList);
        });
    });

    $('#lists').on('submit', '.add-item-form', function(event) {
        event.preventDefault();
        var description = $(this).find('input[name="description"]').val();
        var listId = $(this).closest('li').data('id');
        $.post('/add_item/' + listId, {description: description}, function(data) {
            var newItem = $('<li>' + description + '</li>');
            $(event.target).siblings('.items').append(newItem);
        });
    });
});