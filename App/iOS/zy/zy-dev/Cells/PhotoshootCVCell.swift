//
//  CollectionViewCell.swift
//  zy
//
//  Created by Kagan Cenan on 3.05.2018.
//  Copyright © 2018 morpheus. All rights reserved.
//

import UIKit

class PhotoshootCVCell: UICollectionViewCell {
    
    @IBOutlet var carPhotoImage: UIImageView!
    @IBOutlet var photoUploadImage: UIImageView!
    @IBOutlet var imageDescription: UILabel!
    @IBOutlet var photoUploadView: UIView!
    
    @IBOutlet var checkedImage: UIImageView!
    func setPhoto(isAdded:Bool){
            photoUploadImage.isHidden = isAdded
    }
    
    override func awakeFromNib() {
        setCornerTo(view: carPhotoImage)
        setCornerTo(view: photoUploadView)
    }
    
 
    func setUI(with carPhoto : CarPhoto){

        if let image = carPhoto.image{
            carPhotoImage.image = image
        }
        
        imageDescription.text = carPhoto.position

        switch carPhoto.photoState {
        case .isNotAdded :
            photoUploadView.alpha = 1
            photoUploadImage.image = #imageLiteral(resourceName: "photo-camera")
            checkedImage.isHidden = true
        case .isAdded :
            photoUploadView.alpha = 0.3
            photoUploadImage.image = #imageLiteral(resourceName: "edit")
            checkedImage.isHidden = true
        case .isUploaded :
            photoUploadView.alpha = 0
            checkedImage.isHidden = false
            
        case .isUploadFailed :
            photoUploadView.alpha = 1.0
            photoUploadImage.image = #imageLiteral(resourceName: "fail")
            checkedImage.isHidden = true

        }
      
       
    }
    
    func setExtraPhotoUI(){
        carPhotoImage.image = nil
        photoUploadImage.image = #imageLiteral(resourceName: "plus")
        imageDescription.text = "Fotoğraf ekle"
        checkedImage.isHidden = true
    }
    
    func setCornerTo(view: UIView){
        view.layer.borderWidth = 1
        view.layer.masksToBounds = false
        view.layer.borderColor = UIColor.clear.cgColor
        view.layer.cornerRadius = photoUploadView.frame.height/2
        view.clipsToBounds = true
    }
    
}
