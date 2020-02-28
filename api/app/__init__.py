from flask import Flask
from flask_cors import CORS
from .config.socket import socketio


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__, static_folder='../media')
    CORS(app)
    app.debug = debug
    app.config['SECRET_KEY'] = 'secret_key'

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    socketio.init_app(app)
    return app
