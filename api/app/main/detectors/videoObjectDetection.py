from imageai.Detection import VideoObjectDetection
import tensorflow as tf
import math
import time
import os
import ffmpeg
from app.config.socket import socketio

execution_path = os.getcwd()

detector = None
graph = None


def load_model():
    global detector
    global graph
    detector = VideoObjectDetection()
    detector.setModelTypeAsYOLOv3()
    detector.setModelPath(os.path.join(execution_path, "video-yolo.h5"))
    detector.loadModel()

    graph = tf.get_default_graph()


load_model()


def detection_video(file_name, file_id):
    """

    :param file_name: string
    :param file_id: string
    :return: dict
    """
    with graph.as_default():
        path_new_video = f'media/new-files/{file_name}'
        detected_video_name = str(math.ceil(time.time()))
        path_detected_video_avi = f'media/video-object-detection/{detected_video_name}'

        video_path = detector.detectObjectsFromVideo(input_file_path=os.path.join(execution_path, path_new_video),
                                                     output_file_path=os.path.join(execution_path,
                                                                                   path_detected_video_avi),
                                                     frames_per_second=20, log_progress=True)
        stream = ffmpeg.input(video_path).video.hflip()
        stream = ffmpeg.output(stream, os.path.join(execution_path,
                                                    f'media/video-object-detection/{detected_video_name}.mp4'))

        ffmpeg.run(stream)

        new_stream = ffmpeg.input(os.path.join(execution_path,
                                               f'media/video-object-detection/{detected_video_name}.mp4'))
        new_stream = ffmpeg.hflip(new_stream)
        new_stream = ffmpeg.output(new_stream, os.path.join(execution_path,
                                                            f'media/video-object-detection/flip-{detected_video_name}.mp4'))
        ffmpeg.run(new_stream)
        os.remove(video_path)
        print('end recognition')
        socketio.emit('video-object-detection-end',
                      {'link': f'http://localhost:5000/media/video-object-detection/flip-{detected_video_name}.mp4',
                       'id': file_id})
