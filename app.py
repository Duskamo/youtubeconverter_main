from flask import Flask

import sys
from pytube import YouTube

app = Flask(__name__)

@app.route("/", methods=['GET'])
def hello():
    return "Hello, Flask!"

@app.route("/download/<link>", methods=['GET'])
def download(link):
    yt = YouTube(link)
    yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()

    return "Downloading youtube video..."

@app.route("/send_video", methods=['GET'])
def send_video():
    return "Sending audio/video file to user..."

if __name__ == "__main__":
    app.run()
