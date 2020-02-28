from imageai.Detection import ObjectDetection
import tensorflow as tf
import pandas as pd
import os

from app.config.socket import socketio

execution_path = os.getcwd()

detector = None
graph = None


def load_model():
    global detector
    global graph
    detector = ObjectDetection()
    detector.setModelTypeAsYOLOv3()
    detector.setModelPath(os.path.join(execution_path, 'image-yolo.h5'))
    detector.loadModel()

    graph = tf.get_default_graph()


load_model()


def image_object_detection(file_name, file_id):
    """
    :param file_name: str
    :param file_id: str

    :return: dict
    """
    with graph.as_default():
        path_new_img = f'media/new-files/{file_name}'
        path_detected_img = f'media/image-object-detection/{"detected-"}{file_name}'
        detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path, path_new_img),
                                                     output_image_path=os.path.join(execution_path, path_detected_img),
                                                     minimum_percentage_probability=30)
        print('end detection')
        socketio.emit('image-object-detection-end', {'data': pd.DataFrame(detections).to_json(),
                                                     'link': f'http://localhost:5000/{path_detected_img}',
                                                     'id': file_id})
