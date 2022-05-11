from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from src.database.db import db_session
from src.database.budget import Budget
from src.database.record import Record
from src.database.user import User
from src.database.label import Label


def create_admin(app):
    """! Create the views to add the models to the database.
    
    """
    app.config['FLASK_ADMIN_SWATCH'] = 'cosmo'
    admin = Admin(app, name='Budgetee', template_mode='bootstrap3')

    admin.add_view(ModelView(Budget, db_session))
    admin.add_view(ModelView(Record, db_session))
    admin.add_view(ModelView(User, db_session))
    admin.add_view(ModelView(Label, db_session))