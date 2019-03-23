package com.morpheus.zy.utils

import com.morpheus.zy.BuildConfig
import okhttp3.Interceptor
import okhttp3.MultipartBody
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*
import rx.Single

/**
 * Created by Gökberk Erüst on 6.09.2018.
 *
 */
interface APIService {

    @Multipart
    @POST("/Flow/Upload")
    fun uploadProfilePhoto(@Part key: MultipartBody.Part,
                           @Part reservationFk: MultipartBody.Part,
                           @Part typeFk: MultipartBody.Part,
                           @Part index: MultipartBody.Part,
                           @Part label: MultipartBody.Part,
                           @Part multipartFile: MultipartBody.Part): Single<UploadResponseModel>

    @POST("/Flow/State_Machine")
    fun changeState(@Body requestModel: StateChangerRequestModel) : Single<UploadResponseModel>


    companion object {
        fun create(): APIService {

            val loggingInterceptor = HttpLoggingInterceptor().apply {
                level = if (BuildConfig.DEBUG) HttpLoggingInterceptor.Level.BODY else HttpLoggingInterceptor.Level.NONE
            }
            val httpClient = OkHttpClient().newBuilder().addInterceptor(loggingInterceptor)

            val interceptor = Interceptor { chain ->
                val builder = chain.request()?.newBuilder()
                val request = builder?.build()
                request?.let { chain.proceed(it) }

            }
            httpClient.networkInterceptors().add(interceptor)
            val baseUrl: String = BuildConfig.API
            val retrofit = Retrofit.Builder()
                    .addConverterFactory(GsonConverterFactory.create())
                    .baseUrl(baseUrl)
                    .client(httpClient.build())
                    .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
                    .build()
            return retrofit.create(APIService::class.java)
        }
    }


}