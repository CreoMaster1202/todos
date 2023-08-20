$(document).ready(function() {
    $('#add-list-form').on('submit', function(event) {
        event.preventDefault();
        var name = $(this).find('textarea[name="name"]').val();
        $.post('/add_list', {name: name}, function(data) {
            var newList = $('<li class="todo-list" data-id="' + data.id + '"><h2>' + name + '</h2><div class="editcard" style="display: none;"><form class="edit-list-form"><textarea required name="name">' + name + '</textarea><button type="submit">Save</button></form><form class="delete-list-form"><button type="submit">Delete</button></form></div><ul class="items"></ul><form class="add-item-form"><textarea required name="description" placeholder="Item description"></textarea><button type="submit">Add Item</button></form></li>');
            $('#lists').append(newList).masonry('appended', newList);
        });
    });
  
    $('#lists').on('click', 'h2', function(event) {
      $(this).siblings('.editcard').toggle();
    });
  
    $('#lists').on('click', '.items li', function(event) {
        if (!$(event.target).is('input[type="checkbox"], textarea')) {
          $(this).find('.editcard').toggle();
        }
      });
    
    $('#lists').on('submit', '.edit-list-form', function(event) {
        event.preventDefault();
        var name = $(this).find('textarea[name="name"]').val();
        var listId = $(this).closest('li').data('id');
        $.post('/edit_list/' + listId, {name: name}, function(data) {
            $(event.target).closest('li').find('h2').text(name);
            $(event.target).closest('.editcard').hide();
        });
    });
  
    $('#lists').on('change', '.item-checkbox', function(event) {
        var checked = $(this).is(':checked');
        var itemId = $(this).closest('li').data('id');
        $.post('/check_item/' + itemId, {checked: checked});
    });
          
    $('#lists').on('submit', '.delete-list-form', function(event) {
        event.preventDefault();
        var listId = $(this).closest('li').data('id');
        $.post('/delete_list/' + listId, function(data) {
            var $list = $(event.target).closest('li');
            $list.remove();
            $('#lists').masonry('remove', $list).masonry('layout');
        });
    });
  
  
    $('#lists').on('submit', '.add-item-form', function(event) {
        event.preventDefault();
        var description = $(this).find('textarea[name="description"]').val();
        var listId = $(this).closest('li').data('id');
        $.post('/add_item/' + listId, {description: description}, function(data) {
            var newItem = $('<li data-id="' + data.id + '">' + description + ' <input type="checkbox" class="item-checkbox" {% if item.checked %}checked{% endif %}>' + '<div class="editcard" style="display: none;"><form class="edit-item-form"><textarea required name="description" placeholder="edit me...">' + description + '</textarea><button type="submit">Save</button></form><form class="delete-item-form"><button type="submit">Delete</button></form></div></li>');
            var $items = $(event.target).siblings('.items');
            $items.append(newItem);
            $('#lists').masonry('appended', newItem);
        });
    });
  
  
    $('#lists').on('submit', '.edit-item-form', function(event) {
      event.preventDefault();
      var description = $(this).find('textarea[name="description"]').val();
      var itemId = $(this).closest('li').data('id');
      $.post('/edit_item/' + itemId, {description: description}, function(data) {
        $(event.target).closest('li').contents().first().replaceWith(description);
        $(event.target).closest('.editcard').hide();
      });
    });
  
    $('#lists').on('submit', '.delete-item-form', function(event) {
      event.preventDefault();
      var itemId = $(this).closest('li').data('id');
      $.post('/delete_item/' + itemId, function(data) {
        $(event.target).closest('li').remove();
      });
    });
  });
  