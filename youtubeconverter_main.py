from flask import Flask, render_template, request, send_file

import os
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
        # Get JSON Post data
        link = request.get_json()

        # Download youtube video to server
        yt = YouTube(link['data'])
        #yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()
        yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download(os.path.expanduser('~/Downloads'))

        # Send video to correct folder
        #os.rename(os.getcwd() + "/" + "{0}.mp4".format(yt.title), os.getcwd() + "/videos/{0}.mp4".format(yt.title))

        # Download file
        #send_file(os.getcwd() + "/videos/{0}.mp4".format(yt.title), as_attachment=True)

    return "Finished downloading youtube video."

@app.route("/send-video", methods=['GET'])
def send_video():
    if request.method == "GET":
        send_file(os.getcwd() + "/videos/{0}.mp4".format(yt.title), as_attachment=True)

        return "Sending audio/video file to user..."



if __name__ == "__main__":
    app.run()
