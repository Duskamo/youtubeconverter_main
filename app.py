from flask import Flask, render_template, request

import sys
from pytube import YouTube

app = Flask(__name__,
            template_folder="app/templates",
            static_url_path="",
            static_folder="app/static")

@app.route("/", methods=['GET'])
def hello():
    return render_template('index.html')

@app.route("/download", methods=['POST'])
def download():
    if request.method == "POST":
        link = request.get_json()

        yt = YouTube(link['data'])
        yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()

    return "Finished downloading youtube video."

@app.route("/send_video", methods=['GET'])
def send_video():
    return "Sending audio/video file to user..."

if __name__ == "__main__":
    app.run()
