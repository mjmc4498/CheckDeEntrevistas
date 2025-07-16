from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

DATA_FILE = 'interviews.json'

def load_interviews():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_interviews(interviews):
    with open(DATA_FILE, 'w') as f:
        json.dump(interviews, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/interview', methods=['POST'])
def add_interview():
    data = request.json
    interviews = load_interviews()
    interviews.append(data)
    save_interviews(interviews)
    return jsonify({'message': 'Interview saved successfully!'})

@app.route('/backlog')
def backlog():
    return render_template('backlog.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/interviews')
def get_interviews():
    interviews = load_interviews()
    return jsonify(interviews)

if __name__ == '__main__':
    app.run(debug=True)
