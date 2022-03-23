# Data models of the app. These will have to be defined as database models later on.

class User():
    def __init__(self, code, name, surname, bday, email) -> None:
        self.code = code
        self.name = name
        self.surname = surname
        self.bday = bday
        self.email = email
        self.budgets = []

    def get_budget(self,code):
        return(self.budgets)

    def get_budgets(self):
        return(self.budgets)

    def add_budget(self, budget):
        self.budgets.append(budget)

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}