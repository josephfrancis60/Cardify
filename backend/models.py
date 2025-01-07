from app import db
from sqlalchemy import JSON

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False, nullable=False)
    role = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    gender = db.Column(db.String(10), unique=False, nullable=False)
    img_url = db.Column(db.String(200), unique=False, nullable=True)
    social_links = db.Column(JSON, default={
        "gmail": "", "linkedin": "", "twitter": "", "facebook": ""
    }, unique=False)   # stores upto 4 links
    categories = db.Column(db.PickleType, default=[])    # stores categories as a list


    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "description": self.description,
            "gender": self.gender,
            "imgUrl": self.img_url,
            "socialLinks": self.social_links,
            "categories": self.categories,
        }