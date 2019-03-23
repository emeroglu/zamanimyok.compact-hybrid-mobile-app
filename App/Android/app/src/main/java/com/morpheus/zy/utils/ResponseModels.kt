package com.morpheus.zy.utils

import com.google.gson.annotations.SerializedName

/**
 * Created by Gökberk Erüst on 9.09.2018.
 *
 */
data class Meta(@SerializedName("status") val status: String,
                @SerializedName("message") val message: String)

data class UploadResponseModel(@SerializedName("meta") val meta: Meta)