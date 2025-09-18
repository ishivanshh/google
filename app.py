import os
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# --- Configuration ---
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_super_secret_key_here'
app.config['SESSION_PERMANENT'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- Database Model ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password_hash = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"


# --- Routes ---

@app.route('/')
def home():
    return redirect(url_for('login'))


# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            session['username'] = user.username
            session.modified = True
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Login failed. Please check your username and password.', 'danger')

    return render_template('login.html', title='Login')


# Registration route
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            flash('Username already exists. Please choose a different one.', 'warning')
            return redirect(url_for('register'))

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, password_hash=hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Registration successful! You can now log in.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            flash(f'An error occurred: {e}', 'danger')
            return redirect(url_for('register'))

    return render_template('register.html', title='Register')


# Dashboard route (protected)
@app.route('/dashboard')
def dashboard():
    if 'username' not in session:
        flash('You must be logged in to view this page.', 'danger')
        return redirect(url_for('login'))

    username = session['username']

    # clear session immediately after rendering dashboard
    session.pop('username', None)

    return render_template('dashboard.html', title='Dashboard', username=username)

@app.route('/social')
def social():
    return render_template('social.html')

# Logout route
@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))


# --- Main entry point ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port= 5005)

