from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import models and db
from models import db
from models.user import User
from models.profile import Profile, Skill, Experience, Education

# Create Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app)
db.init_app(app)

def setup_database():
    """Setup database tables"""
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully!")

# Create a function to initialize the app
def create_app():
    """Application factory function"""
    return app

if __name__ == '__main__':
    # setup_database()  # Only run this when you need to create tables
    app.run(debug=True) 