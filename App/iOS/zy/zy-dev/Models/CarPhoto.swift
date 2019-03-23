//
//  CarPhoto.swift
//  zy
//
//  Created by Kagan Cenan on 4.05.2018.
//  Copyright © 2018 morpheus. All rights reserved.
//

import UIKit

struct CarPhoto  {
    var position: String?
    var image : UIImage?
    var photoState : PhotoState
    
    
    init(image :UIImage = UIImage(), photoState : PhotoState = .isNotAdded , position: String = "Arka Sol"){
        self.photoState = photoState
        self.image = image
        self.position = position
    }
    
    init(position : String){
        self.photoState = .isNotAdded
        self.image = UIImage()
        self.position = position
    }
    
}
enum PhotoState{
    case isUploaded, isUploadFailed, isAdded, isNotAdded
}
