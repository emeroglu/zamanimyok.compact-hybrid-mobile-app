package com.morpheus.zy.photoshoot

import android.graphics.Bitmap
import android.net.Uri

/**
 * Created by Gökberk Erüst on 6.04.2018.
 *
 */
class PhotoshootAdapterItem(var text: String,
                            var label: String,
                            var bitMap: Bitmap?,
                            var type: ItemType = ItemType.MANDATORY,
                            var uri: Uri?,
                            var isUploadSuccess: Boolean? = null) {

    enum class ItemType {
        MANDATORY, OPTIONAL
    }
}