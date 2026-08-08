package com.computershop.app.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import com.computershop.app.R;
import com.computershop.app.models.OrderItem;
import com.computershop.app.utils.Constants;
import java.util.List;

public class OrderItemsAdapter extends RecyclerView.Adapter<OrderItemsAdapter.ViewHolder> {

    private Context context;
    private List<OrderItem> orderItems;

    public OrderItemsAdapter(Context context, List<OrderItem> orderItems) {
        this.context = context;
        this.orderItems = orderItems;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_order_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        OrderItem item = orderItems.get(position);

        holder.tvProductName.setText(item.getProductName());
        holder.tvBrand.setText(item.getBrand());
        holder.tvQuantity.setText("Qty: " + item.getQuantity());
        holder.tvSubtotal.setText("$" + String.format("%.2f", item.getSubtotal()));

        // Load product image from drawable
        String imageName = item.getImage();
        if (imageName != null && !imageName.isEmpty()) {
            // Remove file extension if present
            if (imageName.contains(".")) {
                imageName = imageName.substring(0, imageName.lastIndexOf('.'));
            }
            // Convert to lowercase for resource name
            imageName = imageName.toLowerCase();
            int resId = context.getResources().getIdentifier(imageName, "drawable", context.getPackageName());
            if (resId != 0) {
                Glide.with(context)
                        .load(resId)
                        .placeholder(R.drawable.ic_product)
                        .error(R.drawable.ic_product)
                        .into(holder.ivProduct);
            } else {
                // Fallback to placeholder
                Glide.with(context)
                        .load(R.drawable.ic_product)
                        .into(holder.ivProduct);
            }
        } else {
            // Load placeholder image
            Glide.with(context)
                    .load(R.drawable.ic_product)
                    .into(holder.ivProduct);
        }
    }

    @Override
    public int getItemCount() {
        return orderItems.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        ImageView ivProduct;
        TextView tvProductName, tvBrand, tvQuantity, tvSubtotal;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            ivProduct = itemView.findViewById(R.id.ivProduct);
            tvProductName = itemView.findViewById(R.id.tvProductName);
            tvBrand = itemView.findViewById(R.id.tvBrand);
            tvQuantity = itemView.findViewById(R.id.tvQuantity);
            tvSubtotal = itemView.findViewById(R.id.tvSubtotal);
        }
    }
}
