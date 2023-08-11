from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    lists = db.relationship('Lists', backref='user', lazy='dynamic', passive_deletes=True)

class Lists(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    items = db.relationship('Items', backref='list', lazy='dynamic', passive_deletes=True)

    def __repr__(self):
        return self.name

class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.Text, nullable=False)
    complete = db.Column(db.Boolean, default=False)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey('lists.id', ondelete='CASCADE'), nullable=False)

    def __repr__(self):
        return self.item

