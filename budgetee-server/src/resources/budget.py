# Data models of the app. These will have to be defined as database models later on.

class Budget():
    def __init__(self, code, title, description, start_date, end_date) -> None:
        self.code = code
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.records = []
        self.notifications = []

    def get_notification(self,code):
        return(self.notifications)

    def get_notifications(self):
        return(self.notifications)

    def add_notification(self, notification):
        self.notifications.append(notification)

    def get_record(self,code):
        return(self.records)

    def get_records(self):
        return(self.records)

    def add_record(self, record):
        self.records.append(record)

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}