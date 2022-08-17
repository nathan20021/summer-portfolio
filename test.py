from flask import Flask

app = Flask(__name__)

@app.route("/reverse/<string>")
def hello_world(string):
    return string[::-1]


app.run()