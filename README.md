# Recognition
It's app for recognition images and videos.

## Main stack
The app uses Angular (frontend) and Python3 (backend). For frontend part you need NodeJs installed to run/install npm packages. To install, please go to [NodeJS](https://nodejs.org/en/). For backend part you need Python 3 version. To install, please go to[Python3](https://www.python.org/). And you need install **ffmpeg**
for Mac
```
brew install ffmpeg
```
for Linux
```
sudo apt-get install ffmpeg
```
This is necessary for correct video conversion

And you need download models for detecting. After that put their in root directory
**[ResNet50](https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/resnet50_weights_tf_dim_ordering_tf_kernels.h5)**

**[YOLOv3](https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/yolo.h5)**
please change it name to **image-yolo.h5**

**[YOLOv3](https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/yolo.h5)**
please change it name to **video-yolo.h5**

## Server part
- To start a server part, please run:
```
cd api/
python3 -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt 
python3 main.py
```

## Frontend part
- To start a frontend part, please run:
```
cd ui/
npm install
ng serve
```
Navigate to [App](`http://localhost:4200/). The app will automatically reload if you change any of the source files.

![](demo.gif)
