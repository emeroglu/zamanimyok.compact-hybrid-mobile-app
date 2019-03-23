//
//  PhotoshootViewController.swift
//  zy
//
//  Created by Kagan Cenan on 4.05.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//
//
import UIKit
import AVFoundation

protocol PhotoshootVCDelegate {
    func photoSelected(_ photo: UIImage, row : Int)
}

@available(iOS 10.0, *)
class PhotoshootVC:  UIViewController{
    
    @IBOutlet var previewView: UIView!
    @IBOutlet var flashButton: UIButton!
    
    var delegate : PhotoshootVCDelegate?
    var captureSession: AVCaptureSession?
    var videoPreviewLayer: AVCaptureVideoPreviewLayer?
    var capturePhotoOutput: AVCapturePhotoOutput?
    var currentPhoto: CarPhoto?
    var currentRow : Int = 0
    var flashOn = false
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        startCaptureSession()
        self.flashButton.setImage(#imageLiteral(resourceName: "flash-off"), for: .normal)
    }
    
    @IBAction func takePhoto(_ sender: Any) {
        guard let capturePhotoOutput = self.capturePhotoOutput else { return }
        let photoSettings = AVCapturePhotoSettings()
        photoSettings.isAutoStillImageStabilizationEnabled = true
        photoSettings.isHighResolutionPhotoEnabled = true
        photoSettings.flashMode = .auto
        capturePhotoOutput.capturePhoto(with: photoSettings, delegate: self)
    }

    @IBAction func closeScreen(_ sender: Any) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func flashAction(_ sender: Any) {
        self.flashOn = !flashOn
        capturePhotoOutput?.photoSettingsForSceneMonitoring?.flashMode = flashOn ? .on : .off
        self.flashButton.setImage(flashOn ? #imageLiteral(resourceName: "flash-on") : #imageLiteral(resourceName: "flash-off"), for: .normal)
        captureSession?.startRunning()
    }
    

}



//MARK: - Add capture session and layer
@available(iOS 10.0, *)
extension PhotoshootVC{
    func startCaptureSession(){
        let captureDevice = AVCaptureDevice.default(for: .video)
        do {
            let input = try AVCaptureDeviceInput(device: captureDevice!)
            captureSession = AVCaptureSession()
            captureSession?.addInput(input)
            addVideoPreviewLayerWith(session: captureSession!)
            captureSession?.startRunning()
            addCaptureOutput()
        } catch {
            print(error)
        }
    }
    
    func addVideoPreviewLayerWith(session: AVCaptureSession ){
        videoPreviewLayer = AVCaptureVideoPreviewLayer(session: session)
        videoPreviewLayer?.videoGravity = AVLayerVideoGravity.resizeAspectFill
        videoPreviewLayer?.frame = previewView.layer.bounds
        previewView.layer.addSublayer(videoPreviewLayer!)
    }
    
    func addCaptureOutput(){
        capturePhotoOutput = AVCapturePhotoOutput()
        capturePhotoOutput?.isHighResolutionCaptureEnabled = true
        captureSession?.addOutput(capturePhotoOutput!)
     
    }

    func cropImageToSquare(image: UIImage) -> UIImage? {
        var imageHeight = image.size.height
        var imageWidth = image.size.width
        
        if imageHeight > imageWidth {
            imageHeight = imageWidth
        }
        else {
            imageWidth = imageHeight
        }
        
        let size = CGSize(width: imageWidth, height: imageHeight)
        
        let refWidth : CGFloat = CGFloat(image.cgImage!.width)
        let refHeight : CGFloat = CGFloat(image.cgImage!.height)
        
        let x = (refWidth - size.width) / 2
        let y = (refHeight - size.height) / 2
        
        let cropRect = CGRect(x: x, y: y, width: size.height, height: size.width)
        if let imageRef = image.cgImage!.cropping(to: cropRect) {
            return UIImage(cgImage: imageRef, scale: 0, orientation: image.imageOrientation)
        }
        
        return nil
    }
}

//MARK: - AVCapturePhotoCaptureDelegate
@available(iOS 10.0, *)
extension PhotoshootVC : AVCapturePhotoCaptureDelegate {
    
    func photoOutput(_ captureOutput: AVCapturePhotoOutput,
                     didFinishProcessingPhoto photoSampleBuffer: CMSampleBuffer?,
                     previewPhoto previewPhotoSampleBuffer: CMSampleBuffer?,
                     resolvedSettings: AVCaptureResolvedPhotoSettings,
                     bracketSettings: AVCaptureBracketedStillImageSettings?,
                     error: Error?) {
        
        guard error == nil,
            let photoSampleBuffer = photoSampleBuffer else {
                print("Error capturing photo: \(String(describing: error))")
                return
        }
        guard let imageData =
            AVCapturePhotoOutput.jpegPhotoDataRepresentation(forJPEGSampleBuffer: photoSampleBuffer, previewPhotoSampleBuffer: previewPhotoSampleBuffer) else {
                return
        }
        let capturedImage = UIImage.init(data: imageData , scale: 1.0)
        if let realImage = capturedImage, let resizedImage = cropImageToSquare(image: realImage){
            delegate?.photoSelected(resizedImage, row: currentRow)
        }
        self.dismiss(animated: true, completion: nil)
    }
}
