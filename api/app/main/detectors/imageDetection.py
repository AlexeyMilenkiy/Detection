from imageai.Prediction import ImagePrediction
import tensorflow as tf
from tensorflow.python.keras.backend import set_session

import os

from app.config.socket import socketio

execution_path = os.getcwd()

g_1 = None
prediction = None
sess = None


def load_model():
    global g_1
    global prediction
    global sess
    sess = tf.Session()
    set_session(sess)

    prediction = ImagePrediction()
    prediction.setModelTypeAsResNet()
    prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
    prediction.loadModel()

    g_1 = tf.get_default_graph()


load_model()


def image_detection(file_name, file_id):
    """
    :param file_name: str
    :param file_id: str

    :return: dict
    """
    global sess
    global g_1
    with g_1.as_default():
        set_session(sess)
        path_new_img = f'media/new-files/{file_name}'
        predictions, probabilities = prediction.predictImage(os.path.join(execution_path, path_new_img), result_count=5)
        results = {}
        for eachPrediction, eachProbability in zip(predictions, probabilities):
            results[str(eachPrediction)] = eachProbability
        print('end recognition')
        socketio.emit('image-prediction-end', {'data': results,
                                               'link': f'http://localhost:5000/{path_new_img}',
                                               'id': file_id})
