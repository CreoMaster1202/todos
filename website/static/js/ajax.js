// Creating a new list
$('#add-list-form').on('submit', function(e) {
    e.preventDefault();
    var name = $(this).find('textarea[name="name"]').val();
    $.ajax({
        url: '/lists/create',
        method: 'POST',
        data: {name: name},
        success: function(data) {
            // Add the new list to the page
            var list = $('<div class="list"></div>');
            list.append('<h1 class="list__title">#' + data.name + '</h1>');
            list.append('<ul></ul>');
            $('#lists').append(list);
        }
    });
});

// Creating a new item
$('.add-item-form').on('submit', function(e) {
    e.preventDefault();
    var item = $(this).find('textarea[name="item"]').val();
    var list_id = $(this).find('input[name="list_id"]').val();
    $.ajax({
        url: '/items/create',
        method: 'POST',
        data: {item: item, list_id: list_id},
        success: function(data) {
            // Add the new item to the page
            var li = $('<li class="todo__item"></li>');
            li.append('<p class="item__title">' + data.item + '</p>');
            li.append('<input type="checkbox" class="toggle-item" data-id="' + data.id + '">');
            $('#lists').find('ul[data-id="' + data.list_id + '"]').append(li);
        }
    });
});
