import os
import cv2
import numpy as np
import warnings
import sys
from src.anti_spoof_predict import AntiSpoofPredict
from src.generate_patches import CropImage
from src.utility import parse_model_name
warnings.filterwarnings('ignore')
from deepface import DeepFace



def check_image(image):
    height, width, channel = image.shape
    if width/height != 3/4:
        print("Image is not appropriate!!!\nHeight/Width should be 4/3.")
        return False
    else:
        return True


def test(image):
    model_test = AntiSpoofPredict(0)
    image_cropper = CropImage()
    image = cv2.resize(image,(480,640))
    result = check_image(image)
    if result is False:
        return
    image_bbox = model_test.get_bbox(image)
    prediction = np.zeros((1, 3))
    # sum the prediction from single model's result
    model_dir="root/my-medi/server/ml/resources/anti_spoof_models"
    for model_name in os.listdir(model_dir):
        h_input, w_input, model_type, scale = parse_model_name(model_name)
        param = {
            "org_img": image,
            "bbox": image_bbox,
            "scale": scale,
            "out_w": w_input,
            "out_h": h_input,
            "crop": True,
        }
        if scale is None:
            param["crop"] = False
        img = image_cropper.crop(**param)
        prediction += model_test.predict(img, os.path.join(model_dir, model_name))
        

    # draw result of prediction
    label = np.argmax(prediction)
    value = prediction[0][label]/2
    return label


def verify_face():
    try:
        
        user_id=sys.argv[1]
        root="root/my-medi/server"
        image1=root+"/checkinFrames/"+user_id+"/frame-1.png"
        image2=root+"/frames/"+user_id+"/frame-1.png"
        if test(cv2.imread(image1))==1 or test(cv2.imread(image2))==1:
            print("matching face")
            result = DeepFace.verify(image1,image2)
            print(result["verified"])
        else:
            print("Face Match Failed")

    except:
        print("Something Went Wrong")

    
verify_face()