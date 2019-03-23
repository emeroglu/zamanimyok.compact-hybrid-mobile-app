package com.morpheus.zy.utils

import com.google.gson.annotations.SerializedName

/**
 * Created by Gökberk Erüst on 14.09.2018.
 *
 */
data class StateChangerRequestModel(@SerializedName("key") val key: String,
                                    @SerializedName("payload") val payload: Payload)


data class Payload(@SerializedName("reservationFk") val reservationFk: Int,
                   @SerializedName("statusFk") val statusFk: Int)