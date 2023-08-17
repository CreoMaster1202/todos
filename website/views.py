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
    new_list = Lists(name=name, user_id=current_user.id)
    db.session.add(new_list)
    db.session.commit()
    return {'id': new_list.id}
    

# Adding items to the lists
@views.route('/add_item/<int:list_id>', methods=['GET', 'POST'])
def create_item(list_id):
    description = request.form['description']
    user_id = current_user.id
    new_item = Items(description=description, complete=False, user_id=user_id, list_id=list_id)
    db.session.add(new_item)
    db.session.commit()
    return {'id': new_item.id}


# Editing the lists
# @views.route('/todos/<int:list_id>/edit', methods=['GET', 'POST'])
# @login_required
# def edit_list(list_id):
#     name = request.form.get('name')
#     list_ = Lists.query.get(list_id)
#     list_.name = name
#     db.session.commit()
#     return jsonify({'id': list_.id, 'name': list_.name, 'user_id': list_.user_id})

# # Deleting the lists
# @views.route('/todos/<int:list_id>/delete', methods=['POST'])
# @login_required
# def delete_list(list_id):
#     list_ = Lists.query.get(list_id)
#     for item in list_.items:
#         db.session.delete(item)
#     db.session.delete(list_)
#     db.session.commit()
#     return jsonify({'id': list_.id})

# # Editing the items
# @views.route('/items/<int:item_id>/edit', methods=['POST'])
# def edit_item(item_id):
#     description = request.form['item']
#     item = Items.query.get(item_id)
#     item.item = description
#     db.session.commit()
#     return jsonify({'id': item.id, 'item': item.item, 'list_id': item.list_id, 'user_id': item.user_id})

# Checking the items
@views.route('/items/toggle/<int:item_id>', methods=['GET', 'POST'])
@login_required
def toggle_item(item_id):
    item = Items.query.get(item_id)
    item.complete = not item.complete
    db.session.commit()
    return jsonify({'id': item.id})

# # Deleting the items
# @views.route('/items/<int:item_id>/delete', methods=['POST'])
# def delete_item(item_id):
#     item = Items.query.get(item_id)
#     db.session.delete(item)
#     db.session.commit()
#     return jsonify({'id': item.id})

