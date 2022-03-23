# Data models of the app. These will have to be defined as database models later on.

class Notification():
    def __init__(self, code, summary, text, date, time) -> None:
        self.code = code
        self.summary = summary
        self.text = text
        self.date = date
        self.time = time

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}