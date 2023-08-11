from flask import Blueprint, render_template, redirect, url_for, request, flash
from . import db
from .models import User
from flask import flash
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        flash('You are already logged in', category='error')
        return redirect(url_for('views.todos'))
    else:
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')

            user = User.query.filter_by(email=email).first()
            if user:
                if check_password_hash(user.password, password):
                    flash('Logged in successfully!', category='success')
                    login_user(user, remember=True)
                    return redirect(url_for('views.todos'))
                else:
                    flash('Incorrect password, try again.', category='error')
            else:
                flash('Email does not exist.', category='error')

    return render_template("login.html", user=current_user)

@auth.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        flash('You need to log out first', category='error')
        return redirect(url_for('views.todos'))
    else:
        if request.method == 'POST':
            email = request.form.get('email')
            username = request.form.get('username')
            password1 = request.form.get('password1')
            password2 = request.form.get('password2')
        
            email_exists = User.query.filter_by(email=email).first()
            username_exists = User.query.filter_by(username=username).first()

            if email_exists:
                flash('Email already exists', category='error')
            elif username_exists:
                flash('Username already exists', category='error')
            elif password1 != password2:
                flash('Passwords do not match', category='error')
            elif len(email) < 4:
                flash('Email is invalid', category='error')
            elif len(username) < 2:
                flash('Username is too short', category='error')
            elif len(password1) < 4:
                flash('Password is too short', category='error')
            else:
                new_user = User(email=email, username=username, password=generate_password_hash(password1, method='sha256'))
                db.session.add(new_user)
                db.session.commit()
                login_user(new_user, remember=True)
                flash('Account created!', category='success')
                return redirect(url_for('views.todos'))

    return render_template("signup.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('views.landing'))