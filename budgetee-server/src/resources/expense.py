# Data models of the app. These will have to be defined as database models later on.

class Record():
    def __init__(self, code, concept, ammount, state) -> None:
        self.code = code
        self.concept = concept
        self.ammount = ammount
        self.state = state

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}