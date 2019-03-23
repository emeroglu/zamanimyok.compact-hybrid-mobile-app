package com.morpheus.zy.hybrid

import android.animation.Animator
import android.annotation.SuppressLint
import android.app.Activity
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle

import android.preference.PreferenceManager
import android.util.Log
import android.webkit.*
import com.morpheus.zy.BuildConfig
import com.morpheus.zy.R
import com.morpheus.zy.photoshoot.PhotoshootActivity
import kotlinx.android.synthetic.main.activity_hybrid.*
import java.util.*

class HybridActivity : Activity(), JSInterface {

    private var startTime: Long = 0L
    private var onTheWayToPhotoshoot: Boolean = false
    private lateinit var sharedPreferences: SharedPreferences

    override fun onStart() {

        super.onStart()

        if (onTheWayToPhotoshoot) {
            onTheWayToPhotoshoot = false
        } else {
            overridePendingTransition(R.anim.fade_in, R.anim.fade_out)
        }

    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_hybrid)

        initLayout()

        startTime = Calendar.getInstance().timeInMillis

        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(applicationContext)

    }

    override fun onPause() {

        super.onPause()

        if (onTheWayToPhotoshoot) {
            overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left)
        } else {
            overridePendingTransition(R.anim.fade_in, R.anim.fade_out)
        }

    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun initLayout() {

        wv.settings.javaScriptEnabled = true
        wv.settings.cacheMode = WebSettings.LOAD_DEFAULT
        wv.settings.textZoom = 100

        wv.webViewClient = WebViewClient()
        wv.webChromeClient = WebChromeClient();

        wv.addJavascriptInterface(this, "JSInterface")

        wv.loadUrl(BuildConfig.URL)

    }

    @JavascriptInterface
    override fun log(text: String) {
        Log.d("js: ", text);
    }

    @JavascriptInterface
    override fun onload() {

        iv
            .animate()
            .alpha(0F)
            .setDuration(500L)
            .setListener(object : Animator.AnimatorListener {

                override fun onAnimationRepeat(animation: Animator?) {

                }

                override fun onAnimationEnd(animation: Animator?) {
                    rl.removeView(iv)
                }

                override fun onAnimationCancel(animation: Animator?) {

                }

                override fun onAnimationStart(animation: Animator?) {

                }

            })

    }

    @JavascriptInterface
    override fun hybrid() {

    }

    @JavascriptInterface
    override fun photoshoot(key: String, reservationFk: String, stateFk: String, typeFk: String) {

        onTheWayToPhotoshoot = true;

        startActivityForResult(PhotoshootActivity.newIntent(
                context = applicationContext,
                key = key,
                reservationFk = reservationFk.toIntOrNull() ?: 0,
                typeFk = typeFk.toIntOrNull() ?: 0,
                stateFk = stateFk.toIntOrNull() ?: 0), PHOTOSHOOT_ACTIVITY_REQUEST_CODE)
        overridePendingTransition(R.anim.slide_in_up, R.anim.hold)

    }

    @JavascriptInterface
    override fun setDeviceVariable(key: String, value: String) {
        val editor = sharedPreferences.edit()
        editor.putString(key, value)
        editor.apply()
    }

    @JavascriptInterface
    override fun getDeviceVariable(key: String) {

        val value = sharedPreferences.getString(key, "")

        wv.post(object : Runnable {
            override fun run() {
                wv.loadUrl("javascript:\$bridge.js.deviceVariableFor('$key','$value');")
            }
        })

    }

    @JavascriptInterface
    override fun getLocation() {

        // TODO

        var lat: String = "";
        var long: String = "";

        wv.post(object : Runnable {
            override fun run() {
                wv.loadUrl("javascript:\$bridge.js.location('$lat','$long');")
            }
        })

    }

    @JavascriptInterface
    override fun quit() {
        finish()
    }

    override fun onBackPressed() {
        wv.post(object : Runnable {
            override fun run() {
                wv.loadUrl("javascript:\$bridge.js.onBackPressed();")
            }
        })
    }

    fun onPhotoshootFinished() {
        wv.post(object : Runnable {
            override fun run() {
                wv.loadUrl("javascript:\$bridge.js.onPhotoshootFinished();")
            }
        })
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PHOTOSHOOT_ACTIVITY_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            onPhotoshootFinished()
        }
    }


    companion object {
        private const val PHOTOSHOOT_ACTIVITY_REQUEST_CODE = 2023
    }


}
