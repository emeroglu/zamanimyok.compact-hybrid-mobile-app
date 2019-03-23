package com.morpheus.zy.photoshoot

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import com.google.android.cameraview.CameraView
import com.morpheus.zy.R
import kotlinx.android.synthetic.main.activity_camera.*
import java.io.File
import java.io.FileOutputStream


/**
 * Created by Gökberk Erüst on 1.06.2018.
 *
 */
class CameraActivity : Activity() {

    private var resultCode: Int = Activity.RESULT_CANCELED

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_camera)
        initLayout()

    }

    private fun initLayout() {

        takePictureButton.setOnClickListener {
            cameraView.takePicture()
        }

        cancelButton.setOnClickListener {
            finish()
        }

        cameraView.addCallback(object : CameraView.Callback() {
            override fun onPictureTaken(cameraView: CameraView?, data: ByteArray?) {

                val tempFilePath = intent.getParcelableExtra<Uri>(TEMP_FILE_URI_KEY).path
                val tempFile = File(tempFilePath)

                if (tempFile.exists()) {
                    val stream = FileOutputStream(tempFile)
                    stream.write(data)
                    stream.close()
                }
                resultCode = if (tempFile.readBytes().size == data?.size) {
                    Activity.RESULT_OK
                } else {
                    Activity.RESULT_CANCELED
                }
                cameraView?.stop()
            }

            override fun onCameraClosed(cameraView: CameraView?) {
                finishActivityWithResult(resultCode)
            }
        })
    }

    private fun finishActivityWithResult(resultCode: Int) {
        setResult(resultCode, intent)
        finish()
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_right)
    }

    override fun onResume() {
        super.onResume()
        cameraView.start()
    }

    override fun onPause() {
        cameraView.stop()
        super.onPause()
    }

    override fun onBackPressed() {
        super.onBackPressed()
        overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_right)
    }

    companion object {

        const val TEMP_FILE_URI_KEY = "tempUriKey"

        fun newIntent(context: Context, tempFileUri: Uri?): Intent {
            val intent = Intent(context, CameraActivity::class.java)
            intent.putExtra(TEMP_FILE_URI_KEY, tempFileUri)
            return intent
        }
    }

}