from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from src.database.db import db_session
from src.database.budget import Budget
from src.database.record import Record


def create_admin(app):
    app.config['FLASK_ADMIN_SWATCH'] = 'cosmo'
    admin = Admin(app, name='Budgetee', template_mode='bootstrap3')

    admin.add_view(ModelView(Budget, db_session))
    admin.add_view(ModelView(Record, db_session))