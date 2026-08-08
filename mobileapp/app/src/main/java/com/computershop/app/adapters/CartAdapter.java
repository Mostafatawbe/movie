package com.computershop.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.computershop.app.R;
import com.computershop.app.models.CartItem;
import com.computershop.app.utils.Constants;

import java.util.List;

public class CartAdapter extends RecyclerView.Adapter<CartAdapter.CartViewHolder> {

    private List<CartItem> cartItems;
    private OnCartItemListener listener;

    public interface OnCartItemListener {
        void onQuantityChanged(CartItem item, int newQuantity);
        void onRemoveItem(CartItem item);
    }

    public CartAdapter(List<CartItem> cartItems, OnCartItemListener listener) {
        this.cartItems = cartItems;
        this.listener = listener;
    }

    @NonNull
    @Override
    public CartViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_cart, parent, false);
        return new CartViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CartViewHolder holder, int position) {
        CartItem item = cartItems.get(position);
        holder.bind(item, listener);
    }

    @Override
    public int getItemCount() {
        return cartItems.size();
    }

    static class CartViewHolder extends RecyclerView.ViewHolder {
        ImageView ivProduct;
        TextView tvName, tvPrice, tvQuantity, tvSubtotal;
        ImageButton btnDecrease, btnIncrease;
        Button btnRemove;

        public CartViewHolder(@NonNull View itemView) {
            super(itemView);
            ivProduct = itemView.findViewById(R.id.iv_cart_product);
            tvName = itemView.findViewById(R.id.tv_cart_name);
            tvPrice = itemView.findViewById(R.id.tv_cart_price);
            tvQuantity = itemView.findViewById(R.id.tv_cart_quantity);
            tvSubtotal = itemView.findViewById(R.id.tv_cart_subtotal);
            btnDecrease = itemView.findViewById(R.id.btn_decrease);
            btnIncrease = itemView.findViewById(R.id.btn_increase);
            btnRemove = itemView.findViewById(R.id.btn_remove);
        }

        public void bind(final CartItem item, final OnCartItemListener listener) {
            tvName.setText(item.getProductName());
            tvPrice.setText("$" + item.getPrice());
            tvQuantity.setText(String.valueOf(item.getQuantity()));
            tvSubtotal.setText("$" + item.getSubtotal());

            // Load product image from drawable
            String imageName = item.getImage();
            if (imageName != null && !imageName.isEmpty()) {
                // Remove file extension if present
                if (imageName.contains(".")) {
                    imageName = imageName.substring(0, imageName.lastIndexOf('.'));
                }
                // Convert to lowercase for resource name
                imageName = imageName.toLowerCase();
                int resId = itemView.getContext().getResources().getIdentifier(imageName, "drawable", itemView.getContext().getPackageName());
                if (resId != 0) {
                    Glide.with(itemView.getContext())
                            .load(resId)
                            .placeholder(R.drawable.ic_product)
                            .error(R.drawable.ic_product)
                            .into(ivProduct);
                } else {
                    // Fallback to placeholder
                    Glide.with(itemView.getContext())
                            .load(R.drawable.ic_product)
                            .into(ivProduct);
                }
            } else {
                // Load placeholder image
                Glide.with(itemView.getContext())
                        .load(R.drawable.ic_product)
                        .into(ivProduct);
            }

            btnDecrease.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onQuantityChanged(item, item.getQuantity() - 1);
                }
            });

            btnIncrease.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onQuantityChanged(item, item.getQuantity() + 1);
                }
            });

            btnRemove.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onRemoveItem(item);
                }
            });
        }
    }
}
