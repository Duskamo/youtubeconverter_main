from flask import Flask, render_template, request, send_file, jsonify

import os
import time
from sys import platform
from io import BytesIO
from pytube import YouTube
from pathlib import Path
import toolz

app = Flask(__name__,
            template_folder="app/templates",
            static_url_path="",
            static_folder="app/static")

# ############ HELPER METHODS ############
def bytesto(bytes, to, bsize=1024): 
    a = {'k' : 1, 'm': 2, 'g' : 3, 't' : 4, 'p' : 5, 'e' : 6 }
    r = float(bytes)
    return bytes / (bsize ** a[to])


# ############ REST METHODS ############
@app.route("/", methods=['GET'])
def hello():
    return render_template('index.html')

@app.route("/download", methods=['POST'])
def download():
    if request.method == "POST":
        # Get JSON Post data
        link = request.get_json()

        # Download youtube video to server
        yt = YouTube(link['url'])
        videos = None
        
        if link['type'] == 'video':
            videos = yt.streams.filter(only_video=True, file_extension='mp4').order_by('resolution').desc()

        elif link['type'] == 'audio':
            videos = yt.streams.filter(only_audio=True).order_by('abr').desc()


        # Save unique video data to data json object 
        data = {
            'title': yt.title,
            'thumbnail_url': yt.thumbnail_url,
            'length': '{:02d}:{:02d}'.format(*divmod(yt.length, 60)),
            'videos': []
        }
        
        videosUnique = []
        if link['type'] == 'video':
            for i in range(len(videos)):
                videosUnique.append({'resolution': videos[i].resolution, 'size': round(bytesto(videos[i].filesize,'m')), 'id': i})
        elif link['type'] == 'audio':
            for i in range(len(videos)):
                videosUnique.append({'resolution': videos[i].abr, 'size': round(bytesto(videos[i].filesize,'m')), 'id': i})

        done = set()
        result = []
        for d in videosUnique:
            if d['resolution'] not in done:
                done.add(d['resolution'])
                result.append(d)


        data['videos'] = result


        # Return data video json object
        return jsonify(data)

    return "Finished downloading youtube video."

@app.route("/send-video", methods=['POST'])
def send_video():
    if request.method == "POST":
        # Get JSON Post data
        link = request.get_json()

        # Download youtube video list to server
        yt = YouTube(link['url'])
        videos = None
        
        if link['type'] == 'video':
            videos = yt.streams.filter(only_video=True, file_extension='mp4').order_by('resolution').desc()

        elif link['type'] == 'audio':
            videos = yt.streams.filter(only_audio=True).order_by('abr').desc()

        # Filter for a unique video list
        videosUnique = []
        if link['type'] == 'video':
            for i in range(len(videos)):
                videosUnique.append({'resolution': videos[i].resolution, "video":videos[i]})
        elif link['type'] == 'audio':
            for i in range(len(videos)):
                videosUnique.append({'resolution': videos[i].abr, "video":videos[i]})

        done = set()
        result = []
        for d in videosUnique:
            if d['resolution'] not in done:
                done.add(d['resolution'])
                result.append(d)

        # Get video to send to user via video id
        video = result[int(link['id'])]['video']

        # Method 1
        # downloads_path = str(Path.home() / "Downloads")
        # if platform == "win32":
        #     video.download(output_path=downloads_path)
        # else:
        #     video.download()

        # # Send video file to user
        # return send_file("{0}.mp4".format(yt.title), as_attachment=True)

        # Method 2
        buffer = BytesIO()
        video.stream_to_buffer(buffer)
        buffer.seek(0)

        return send_file(
            buffer,
            as_attachment=True,
            download_name="{0}.mp4".format(yt.title),
            mimetype="video/mp4"
        )

        return "Sending audio/video file to user..."


# @app.route('/download_exe')
# def download_exe():
#     path = "AutoClicker.exe"
#     return send_file(path, as_attachment=True)


if __name__ == "__main__":
    app.run()
