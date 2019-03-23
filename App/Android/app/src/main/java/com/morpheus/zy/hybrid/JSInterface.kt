package com.morpheus.zy.hybrid

import android.webkit.JavascriptInterface

/**
 * Created by Gökberk Erüst on 6.04.2018.
 *
 */
interface JSInterface {

    @JavascriptInterface
    fun log(text: String)

    @JavascriptInterface
    fun onload()

    @JavascriptInterface
    fun photoshoot(key: String, reservationFk: String, stateFk: String, typeFk: String)

    @JavascriptInterface
    fun hybrid()

    @JavascriptInterface
    fun setDeviceVariable(key: String, value: String)

    @JavascriptInterface
    fun getDeviceVariable(key: String)

    @JavascriptInterface
    fun getLocation()

    @JavascriptInterface
    fun quit()

}