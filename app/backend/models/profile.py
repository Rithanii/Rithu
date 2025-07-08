from . import db

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    bio = db.Column(db.String(256))

    def __repr__(self):
        return f'<Profile {self.id}>'

# Placeholders for Skill, Experience, Education
class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)

class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    institution = db.Column(db.String(120), nullable=False)
