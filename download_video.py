import sys
from pytube import YouTube

yt = YouTube(sys.argv[1])
yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first().download()
