package com.morpheus.zy.photoshoot

import android.Manifest
import android.app.Activity
import android.content.Context
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_photoshoot.*
import android.provider.MediaStore
import android.content.Intent
import android.content.pm.ActivityInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.support.v7.widget.GridLayoutManager
import android.text.TextUtils
import com.morpheus.zy.R
import com.morpheus.zy.utils.APIService
import com.morpheus.zy.utils.Payload
import com.morpheus.zy.utils.StateChangerRequestModel
import okhttp3.*
import retrofit2.HttpException
import rx.Single
import rx.Subscription
import rx.android.schedulers.AndroidSchedulers
import rx.schedulers.Schedulers
import java.io.File


/**
 * Created by Gökberk Erüst on 6.04.2018.
 *
 */
class PhotoshootActivity : Activity() {

    private var adapter: PhotoshootAdapter? = null
    private var tempFileUri: Uri? = null
    private lateinit var service: APIService
    private var uploadingStatus = UploadingStatus.NotStarted
        set(value) {
            field = value
            updateUploadButtonStatus()
        }

    override fun onStart() {

        super.onStart()

        overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left)

    }

    override fun onResume() {

        super.onResume()

        if (takingPicture)
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_right)
        else
            overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left)

    }

    override fun onPause() {

        super.onPause()

        if (takingPicture)
            overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left)
        else
            overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_right)

    }

    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_photoshoot)

        initLayout()

        service = APIService.create()

    }

    private fun initLayout() {

        val itemClickListener = object : PhotoshootAdapter.ItemClickListener {

            override fun onItemClicked(position: Int) {

                currentItem = itemList[position]

                if (isStoragePermissionGranted() && isCameraPermissionGranted()) {
                    openCameraActivity()
                } else if (!isStoragePermissionGranted()) {
                    requestStoragePermission()
                } else if (!isCameraPermissionGranted()) {
                    requestCameraPermissions()
                }
            }

        }

        adapter = PhotoshootAdapter(itemList = itemList, itemClickListener = itemClickListener)

        photoShootRecyclerView.layoutManager = GridLayoutManager(applicationContext, 2)
        photoShootRecyclerView.adapter = adapter

        photoShootButton.setOnClickListener {
            if (uploadingStatus == UploadingStatus.Success) {
                updateStateOfReservation()
            } else {
                itemList.forEachIndexed { position, item ->
                    if (item.uri != null && item.isUploadSuccess != true) {
                        uploadPhoto(position)
                    }
                }
            }

        }
    }

    private fun openCameraActivity() {

        tempFileUri = createTempFile()

        takingPicture = true

        val takePictureIntent =
                Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                        .putExtra(MediaStore.EXTRA_OUTPUT, tempFileUri)
                        .putExtra(MediaStore.EXTRA_SCREEN_ORIENTATION, ActivityInfo.SCREEN_ORIENTATION_PORTRAIT)
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)


        if (takePictureIntent.resolveActivity(packageManager) != null) {

            startActivityForResult(CameraActivity.newIntent(applicationContext, tempFileUri), REQUEST_IMAGE_CAPTURE)
            overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_left)
        }

    }

    private fun isStoragePermissionGranted(): Boolean =
            ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED

    private fun isCameraPermissionGranted(): Boolean =
            ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED

    private fun requestStoragePermission() {

        ActivityCompat.requestPermissions(this,
                arrayOf(Manifest.permission.WRITE_EXTERNAL_STORAGE), STORAGE_PERMISSION_KEY)

    }

    private fun requestCameraPermissions() {

        ActivityCompat.requestPermissions(this,
                arrayOf(Manifest.permission.CAMERA), CAMERA_PERMISSION_KEY)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>?, grantResults: IntArray?) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            CAMERA_PERMISSION_KEY -> {
                val result = grantResults?.firstOrNull()
                if (result == PackageManager.PERMISSION_GRANTED) {
                    if (isStoragePermissionGranted()) {
                        openCameraActivity()
                    } else {
                        requestStoragePermission()
                    }
                }
            }
            STORAGE_PERMISSION_KEY -> {
                val result = grantResults?.firstOrNull()
                if (result == PackageManager.PERMISSION_GRANTED) {
                    if (isCameraPermissionGranted()) {
                        openCameraActivity()
                    } else {
                        requestCameraPermissions()
                    }
                }
            }
        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {

        if (requestCode == REQUEST_IMAGE_CAPTURE) {

            if (resultCode == Activity.RESULT_OK) {

                currentItem?.bitMap = getScaledBitmapFromUri()
                currentItem?.uri = tempFileUri

                if (shouldAddOptional()) {
                    itemList.add(PhotoshootAdapterItem("Fotoğraf Ekle", "Extra Photos",null, PhotoshootAdapterItem.ItemType.OPTIONAL, uri = null))
                    photoShootButton.isEnabled = true
                }

                adapter?.notifyDataSetChanged()
                takingPicture = false
            }
        }
    }

    private fun createTempFile(): Uri {
        val tempFile = File.createTempFile("zytemp", ".jpeg", applicationContext.externalCacheDir)
        tempFile.createNewFile()
        return Uri.fromFile(tempFile)
    }

    private fun getScaledBitmapFromUri(): Bitmap {
        val original = BitmapFactory.decodeFile(tempFileUri?.path)
        return Bitmap.createScaledBitmap(original, 1024, 1024, true)
    }

    private fun shouldAddOptional(): Boolean {

        if (itemList.last().type == PhotoshootAdapterItem.ItemType.OPTIONAL) {
            return true
        }
        itemList.forEach { item ->
            if (item.bitMap == null) {
                return false
            }
        }
        return true
    }

    private fun uploadPhoto(position: Int) {

        uploadingStatus = UploadingStatus.Uploading

        val inputStream = applicationContext.contentResolver.openInputStream(itemList[position].uri)
        val reqBody = RequestBody.create(MediaType.parse("image/*"), inputStream.readBytes())
        val reqFile = MultipartBody.Part.createFormData("file",
                itemList[position].uri?.pathSegments?.last() ?: "zamanımyok", reqBody)

        val key = MultipartBody.Part.createFormData("key", intent.getStringExtra(KEY));
        val typeFk = MultipartBody.Part.createFormData("typeFk", intent.getIntExtra(TYPE_FK_KEY, 0).toString());
        val reservationFk = MultipartBody.Part.createFormData("reservationFk", intent.getIntExtra(RESERVATION_FK_KEY, 0).toString());
        val label = MultipartBody.Part.createFormData("label", itemList[position].label);
        val index = MultipartBody.Part.createFormData("index", position.toString());

        request(service.uploadProfilePhoto(key = key, typeFk = typeFk, reservationFk = reservationFk,
                label = label, index = index, multipartFile = reqFile), { response ->

            if (TextUtils.equals(response?.meta?.status, "success")) {
                itemList[position].isUploadSuccess = true
                uploadedItems.add(itemList[position])
            } else {
                itemList[position].isUploadSuccess = false
            }

            adapter?.notifyDataSetChanged()
            if (shouldUpdateUploadState()) {
                updateUploadState()
            }

        }, {

        })
    }

    private fun shouldUpdateUploadState(): Boolean {
        return uploadedItems.filter { it.type == PhotoshootAdapterItem.ItemType.MANDATORY }.size ==
                itemList.filter { it.type == PhotoshootAdapterItem.ItemType.MANDATORY }.size
    }

    private fun updateUploadState() {
        if (itemList.find { it.type == PhotoshootAdapterItem.ItemType.MANDATORY && it.isUploadSuccess == false } != null) {
            uploadingStatus = UploadingStatus.Failed
        } else if (itemList.find { it.type == PhotoshootAdapterItem.ItemType.MANDATORY && it.isUploadSuccess == false } == null) {
            uploadingStatus = UploadingStatus.Success
        }
    }


    private fun updateUploadButtonStatus() {
        when (uploadingStatus) {
            UploadingStatus.NotStarted -> {
                photoShootButton.text = getString(R.string.photoshoot_button_upload_text)
                photoShootButton.isEnabled = false
            }
            UploadingStatus.Uploading -> {
                photoShootButton.text = getString(R.string.photoshoot_button_uploading_text)
                photoShootButton.isEnabled = false
            }
            UploadingStatus.Failed -> {
                photoShootButton.text = getString(R.string.photoshoot_button_upload_failed_text)
                photoShootButton.isEnabled = true
            }
            UploadingStatus.Success -> {
                photoShootButton.text = getString(R.string.photoshoot_button_upload_success_text)
                photoShootButton.isEnabled = true
            }
        }

    }

    private fun updateStateOfReservation() {
        if (itemList.find { it.type == PhotoshootAdapterItem.ItemType.MANDATORY && it.isUploadSuccess != true } == null) {
            request(service.changeState(StateChangerRequestModel(
                    key = intent?.getStringExtra(KEY) ?: "",
                    payload = Payload(
                            reservationFk = intent?.getIntExtra(RESERVATION_FK_KEY, 0) ?: 0,
                            statusFk = intent?.getIntExtra(STATE_FK_KEY, 0) ?: 0))), {

                val resultCode = if (TextUtils.equals(it?.meta?.status, "success")) Activity.RESULT_OK else Activity.RESULT_CANCELED
                closeActivityWithResultCode(resultCode)

            }, {

            })
        }
    }

    private fun closeActivityWithResultCode(resultCode: Int) {
        setResult(resultCode)
        finish()
        overridePendingTransition(R.anim.hold, R.anim.slide_out_down)
    }

    private fun <T : Any> request(request: Single<T>,
                                  responseHandler: (response: T?) -> Unit,
                                  errorHandler: (error: HttpException) -> Unit): Subscription {

        val singleObject = request.subscribeOn(Schedulers.io())
        return singleObject
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(
                        { result ->
                            responseHandler(result)
                        },
                        { error ->
                            if (error is HttpException) {
                                errorHandler(error)
                            }
                        })

    }

    enum class UploadingStatus {
        NotStarted, Uploading, Failed, Success
    }

    companion object {

        private const val KEY = "key"
        private const val RESERVATION_FK_KEY = "reservationFk"
        private const val TYPE_FK_KEY = "typeFk"
        private const val STATE_FK_KEY = "stateFk"

        private const val CAMERA_PERMISSION_KEY = 187
        private const val STORAGE_PERMISSION_KEY = 123


        const val REQUEST_IMAGE_CAPTURE = 123

        var takingPicture: Boolean = false
        var currentItem: PhotoshootAdapterItem? = null

        private val uploadedItems = arrayListOf<PhotoshootAdapterItem>()

        val itemList = arrayListOf<PhotoshootAdapterItem>()

        fun newIntent(context: Context, key: String, reservationFk: Int, typeFk: Int, stateFk: Int): Intent {

            itemList.clear()
            itemList.addAll(arrayListOf(
                    PhotoshootAdapterItem(text = "sol", label = "left", bitMap = null, uri = null),
                    PhotoshootAdapterItem(text = "sağ", label = "right", bitMap = null, uri = null),
                    PhotoshootAdapterItem(text = "ön", label = "front", bitMap = null, uri = null),
                    PhotoshootAdapterItem(text = "arka", label = "rear", bitMap = null, uri = null)))

            val intent = Intent(context, PhotoshootActivity::class.java)
            intent.putExtra(KEY, key)
            intent.putExtra(RESERVATION_FK_KEY, reservationFk)
            intent.putExtra(TYPE_FK_KEY, typeFk)
            intent.putExtra(STATE_FK_KEY, stateFk)
            return intent
        }

    }


}