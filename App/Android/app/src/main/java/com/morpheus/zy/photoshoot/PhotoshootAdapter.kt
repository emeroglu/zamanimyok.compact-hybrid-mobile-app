package com.morpheus.zy.photoshoot

import android.graphics.*
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.morpheus.zy.R
import kotlinx.android.synthetic.main.vholder_photoshoot.view.*

/**
 * Created by Gökberk Erüst on 6.04.2018.
 *
 */
class PhotoshootAdapter(private val itemList: ArrayList<PhotoshootAdapterItem>,
                        private val itemClickListener: ItemClickListener) : RecyclerView.Adapter<PhotoshootAdapter.PhotoShootViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PhotoShootViewHolder {

        val layoutInflater = LayoutInflater.from(parent.context)
        return PhotoShootViewHolder(layoutInflater.inflate(R.layout.vholder_photoshoot, parent, false))

    }

    override fun getItemCount(): Int {
        return itemList.size
    }

    override fun onBindViewHolder(holder: PhotoShootViewHolder, position: Int) {
        holder.bindData(itemList[position])
    }

    inner class PhotoShootViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        fun bindData(item: PhotoshootAdapterItem) {

            itemView.itemText.text = item.text

            item.bitMap?.let {
                itemView.photoPreviewLogo.visibility = View.INVISIBLE
                itemView.photoPreview.setImageBitmap(
                        getRoundedCornerBitmap(
                                bitmap = it,
                                pixels = itemView.resources.getDimensionPixelSize(R.dimen.photoshoot_item_round_size)))
                itemView.photoPreview.visibility = View.VISIBLE
            } ?: run {
                itemView.photoPreviewLogo.visibility = View.VISIBLE
                itemView.photoPreview.visibility = View.INVISIBLE
            }

            itemView.setOnClickListener {
                itemClickListener.onItemClicked(itemList.indexOf(item))
            }

            if(item.isUploadSuccess == true) {
                itemView.photoPreviewSuccessLogo.visibility = View.VISIBLE
            }

            if (item.type == PhotoshootAdapterItem.ItemType.OPTIONAL) {
                //TODO: change empty state icon
            }

        }
    }

    fun getRoundedCornerBitmap(bitmap: Bitmap, pixels: Int): Bitmap {
        val output = Bitmap.createBitmap(bitmap.width, bitmap
                .height, Bitmap.Config.ARGB_8888)
        val canvas = Canvas(output)

        val color = -0xbdbdbe
        val paint = Paint()
        val rect = Rect(0, 0, bitmap.width, bitmap.height)
        val rectF = RectF(rect)
        val roundPx = pixels.toFloat()

        paint.setAntiAlias(true)
        canvas.drawARGB(0, 0, 0, 0)
        paint.setColor(color)
        canvas.drawRoundRect(rectF, roundPx, roundPx, paint)

        paint.xfermode = PorterDuffXfermode(PorterDuff.Mode.SRC_IN)
        canvas.drawBitmap(bitmap, rect, rect, paint)

        return output
    }

    interface ItemClickListener {
        fun onItemClicked(position: Int)
    }

}