//
//  PhotoListVC.swift
//  zy
//
//  Created by Kagan Cenan on 8.05.2018.
//  Copyright © 2018 zamanimyok. All rights reserved.
//

import UIKit
import Alamofire

class PhotoListVC: UIViewController {

    @IBOutlet var uploadButton: UIButton!
    @IBOutlet var collectionView: UICollectionView!
    
    var carPhotos : [CarPhoto] = [CarPhoto(position: "Ön"),
                                  CarPhoto(position: "Sol"),
                                  CarPhoto(position: "Arka"),
                                  CarPhoto(position: "Sağ")]
    var currentRow : Int?
    var photoUploadTryCount = 0
    var isPhotoUploading = false
    var isAllPhotosUploaded = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
        VC.photoListVC = self
        checkForUploadButton()
    }

    @IBAction func uploadAction(_ sender: Any) {
        if photoUploadTryCount == 4 {
            //Cok sure hatali olursa eksik kalirsa
        } else if isAllPhotosUploaded {
            
            let url = VC.api! + "/Flow/State_Machine";
            let parameters = [
                "key": VC.key!,
                "payload": [
                    "reservationFk": VC.reservationFk!,
                    "statusFk": VC.stateFk!
                ]
            ] as [String : Any]
            
            Alamofire.request(url, method: .post , parameters: parameters, encoding: JSONEncoding.default).responseJSON { response in
              VC.hybridVC?.onPhotoshootFinished()
            };
            
        } else {
            isPhotoUploading = true
            photoUploadTryCount += 1
            self.navigationController?.popViewController(animated: true)
            uploadButton.setTitle("Yükleniyor lütfen bekleyin...", for: .normal)
            uploadButton.isUserInteractionEnabled = false
            uploadButton.alpha = 0.3
            for i in 0...(carPhotos.count - 1) {
                if carPhotos[i].photoState == .isAdded || carPhotos[i].photoState == .isUploadFailed{
                    sendImage(currentRow: i)
                }
            }
        }}
    
    func toEng(text: String) -> String {
        
        if (text == "Ön") {
            return "front"
        } else if (text == "Sol Ön") {
            return "front-left"
        }  else if (text == "Sol") {
            return "left"
        }  else if (text == "Sol Arka") {
            return "rear-left"
        }  else if (text == "Arka") {
            return "rear"
        }  else if (text == "Sağ Arka") {
            return "rear-right"
        }  else if (text == "Sağ") {
            return "right"
        }  else if (text == "Sağ Ön") {
            return "front-right"
        } else {
            return ""
        }
        
    }
    
    func sendImage(currentRow: Int ){
        //let image = UIImage.init(named: "deneme.png")
        guard let photo = carPhotos[currentRow].image else {
            return
        }
        let imgData = UIImageJPEGRepresentation(photo, 0.2)!
        
        Alamofire.upload(multipartFormData: { multipartFormData in
            
            multipartFormData.append((VC.key?.data(using: String.Encoding.utf8)!)!, withName: "key")
            multipartFormData.append(String(VC.reservationFk!).data(using: String.Encoding.utf8)!, withName: "reservationFk")
            multipartFormData.append(String(VC.typeFk!).data(using: String.Encoding.utf8)!, withName: "typeFk")
            multipartFormData.append(self.toEng(text: self.carPhotos[currentRow].position!).data(using: String.Encoding.utf8)!, withName: "label")
            multipartFormData.append(String(currentRow).data(using: String.Encoding.utf8)!, withName: "index")
            multipartFormData.append(imgData, withName: "file",fileName: "file.jpeg", mimeType: "image/jpeg")
            
        }, to: VC.api! + "/Flow/Upload")
        { (result) in
            switch result {
            case .success(let upload, _, _):
                
                upload.uploadProgress(closure: { (progress) in
                    print("Upload Progress (\(currentRow)): \(progress.fractionCompleted)")
                })
                
                upload.response { response in
                    
                    let dataString : String = String(data: response.data!, encoding: String.Encoding.utf8)!
                    
                    if response.response?.statusCode == 200 {
                        self.carPhotos[currentRow].photoState = .isUploaded
                        self.checkForUploadButtonAfterUpload()

                        return
                    } else {
                        self.carPhotos[currentRow].photoState = .isNotAdded
                        self.checkForUploadButtonAfterUpload()

                    }
                    
                }
                
            case .failure(let encodingError):
                print(encodingError)
                self.carPhotos[currentRow].photoState = .isNotAdded
                self.checkForUploadButtonAfterUpload()
            }
        }
    }
    
    func checkForUploadButtonAfterUpload(){
        
        if checkForAllPhotosUploaded(){
            uploadButton.isUserInteractionEnabled = true
            uploadButton.alpha = 1
            uploadButton.setTitle("DEVAM", for: .normal)
            isAllPhotosUploaded = true
        }else{
            for photo in carPhotos{
                if photo.photoState == .isUploadFailed{
                    uploadButton.setTitle("Yüklenemeyenleri tekrar dene.", for: .normal)
                    uploadButton.isUserInteractionEnabled = true
                    uploadButton.alpha = 1
                    break
                }
            }
        }
        
        self.collectionView.reloadData()

    }
    
}


// MARK: - CollectionView Data Source
extension PhotoListVC: UICollectionViewDataSource {
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        
        return carPhotos.count + (!checkForCarPhotos() || (photoUploadTryCount != 0) ? 0 : 1)
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "PhotoshootCVCell", for: indexPath) as! PhotoshootCVCell
        if indexPath.row == carPhotos.count{
            cell.setExtraPhotoUI()
        }else{
            cell.setUI(with: carPhotos[indexPath.row])
        }
        return cell
     }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if photoUploadTryCount == 0 {
            currentRow = indexPath.row
            self.performSegue(withIdentifier: "goTakePhoto", sender: self)
        }
    }
}

// MARK: - CollectionViewDelegateFlowLayout
extension PhotoListVC: UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
       
        let screenWidth = UIScreen.main.bounds.width
        return CGSize(width: (screenWidth - 60) / 2 , height: (screenWidth - 60) / 2 + 30)
    }
    
}


// MARK: - Prepare For Segue
extension PhotoListVC {
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let identifier = segue.identifier, identifier == "goTakePhoto",
            let destination = segue.destination as? PhotoshootVC{
            destination.currentRow = currentRow!
            destination.delegate = self
        }
    }
}

// MARK: - PhotoshootVCDelegate
extension PhotoListVC : PhotoshootVCDelegate {
    func photoSelected(_ photo: UIImage, row: Int) {
        if row == carPhotos.count{
            carPhotos.append(CarPhoto(image: photo, photoState: .isAdded, position: "Ek Fotoğraf"))
        }else{
            carPhotos[row].image = photo
            carPhotos[row].photoState = .isAdded
        }
        checkForUploadButton()
        collectionView.reloadData()
    }
}

// MARK: - Functions
extension PhotoListVC {
    
    func checkForUploadButton() {
        let available = checkForCarPhotos()
        uploadButton.alpha = available ? 1 : 0.4
        uploadButton.isUserInteractionEnabled = available
    }
    
    func checkForCarPhotos() -> Bool{
        for photo in carPhotos{
            if photo.photoState == .isNotAdded || photo.photoState == .isUploadFailed{
                return false
            }
        }
        return true
    }
    
    func checkForAllPhotosUploaded() -> Bool{
        for photo in carPhotos{
            if photo.photoState == .isNotAdded || photo.photoState == .isAdded{
                return false
            }
        }
        return true
    }
}












