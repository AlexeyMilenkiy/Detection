from flask import request, make_response, jsonify
from werkzeug.utils import secure_filename
import math
import time
from threading import Thread

from app.main.detectors.imageObjectDetection import image_object_detection
from app.main.detectors.imageDetection import image_detection
from app.main.detectors.videoObjectDetection import detection_video
from app.main import main
import os

execution_path = os.getcwd()


def handling_input_file(req, detect_name, video=False):
    """
    :param req: file type FormData
    :param detect_name: function detect
    :param video: boolean
    :return:
    """
    if video:
        file = req.files['video']
    else:
        file = req.files['image']
    file_id = req.form['id']
    file_name = str(math.ceil(time.time())) + secure_filename(file.filename)
    file.save(f'./media/new-files/{file_name}')
    thread = Thread(target=detect_name, args=(file_name, file_id))
    thread.start()
    return file_id


@main.route('/image-prediction', methods=['POST'])
def get_image_detection():
    """
    :input: file type FormData
    :return: json
    """
    file_id = handling_input_file(request, image_detection)
    return make_response(jsonify({"id": file_id}), 200)


@main.route('/image-object-detection', methods=['POST'])
def get_image_object_detection():
    """
    :input: file type FormData
    :return: json
    """
    file_id = handling_input_file(request, image_object_detection)
    return make_response(jsonify({"id": file_id}), 200)


@main.route('/video-object-detection', methods=['POST'])
def get_video_object_detection():
    """
    :input: file type FormData
    :return: json
    """
    file_id = handling_input_file(request, detection_video, True)
    return make_response(jsonify({"id": file_id}), 200)


@main.errorhandler(404)
def not_found(error):
    print(error)
    pass
