from utils import *

myDrone = initializeTello()

w, h = 360, 240

while True:
    img = telloGetFrame(myDrone, w, h)
    cv2.imshow('Image', img)
    if cv2.waitKey(1) & 0xFF == '27':
        myDrone.land() # land : 착륙
        break