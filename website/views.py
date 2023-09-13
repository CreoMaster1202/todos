from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from . import db
from .models import User, Items, Lists

views = Blueprint('views', __name__)

# Landing page
@views.route('/')
@views.route('/landing')
def landing():
    return render_template("landing.html")

# About page
@views.route('/about')
def about():
    return render_template("about.html")

# ------------------------------------------------

# Main page
@views.route('/todos', methods=['GET', 'POST'])
@login_required
def todos():
    user = User.query.get(current_user.id)
    lists = Lists.query.filter_by(user_id=current_user.id).all()
    return render_template("todos.html", user=user, lists=lists)

# Creating the lists
@views.route('/add_list', methods=['GET', 'POST'])
@login_required
def create_list():
    name = request.form['name']
    # name = name.replace('\n', '<br/>')
    new_list = Lists(name=name, user_id=current_user.id)
    db.session.add(new_list)
    db.session.commit()
    return {'id': new_list.id}

@views.route('/edit_list/<int:list_id>', methods=['POST'])
@login_required
def edit_list(list_id):
    name = request.form['name']
    # name = name.replace('\n', '<br/>')
    list = Lists.query.get(list_id)
    list.name = name
    db.session.commit()
    return {'id': list.id}

@views.route('/delete_list/<int:list_id>', methods=['POST'])
@login_required
def delete_list(list_id):
    list = Lists.query.get(list_id)
    for item in list.items:
        db.session.delete(item)
    db.session.delete(list)
    db.session.commit()
    return {'id': list.id}

# Adding items to the lists
@views.route('/add_item/<int:list_id>', methods=['GET', 'POST'])
@login_required
def create_item(list_id):
    description = request.form['description']
    # description = description.replace('\n', '<br/>')
    user_id = current_user.id
    new_item = Items(description=description, checked=False, user_id=user_id, list_id=list_id)
    db.session.add(new_item)
    db.session.commit()
    return {'id': new_item.id}

@views.route('/check_item/<int:item_id>', methods=['POST'])
@login_required
def check_item(item_id):
    checked = request.form['checked'] == 'true'
    item = Items.query.get(item_id)
    item.checked = checked
    db.session.commit()
    return {'id': item.id}

@views.route('/edit_item/<int:item_id>', methods=['POST'])
@login_required
def edit_item(item_id):
    description = request.form['description']
    # description = description.replace('\n', '<br/>')
    item = Items.query.get(item_id)
    item.description = description
    db.session.commit()
    return {'id': item.id}

@views.route('/delete_item/<int:item_id>', methods=['POST'])
@login_required
def delete_item(item_id):
    item = Items.query.get(item_id)
    db.session.delete(item)
    db.session.commit()
    return {'id': item.id}
