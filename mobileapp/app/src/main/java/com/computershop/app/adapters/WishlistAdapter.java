package com.computershop.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.computershop.app.R;
import com.computershop.app.models.Product;

import java.util.List;

public class WishlistAdapter extends RecyclerView.Adapter<WishlistAdapter.WishlistViewHolder> {

    private List<Product> products;
    private OnWishlistItemClickListener listener;

    public interface OnWishlistItemClickListener {
        void onProductClick(Product product);
        void onRemoveFromWishlist(Product product);
    }

    public WishlistAdapter(List<Product> products, OnWishlistItemClickListener listener) {
        this.products = products;
        this.listener = listener;
    }

    @NonNull
    @Override
    public WishlistViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_wishlist, parent, false);
        return new WishlistViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull WishlistViewHolder holder, int position) {
        Product product = products.get(position);
        holder.bind(product, listener);
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    static class WishlistViewHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        ImageView ivProduct;
        TextView tvName;
        TextView tvPrice;
        TextView tvBrand;
        ImageButton btnRemove;

        public WishlistViewHolder(@NonNull View itemView) {
            super(itemView);
            cardView = itemView.findViewById(R.id.card_product);
            ivProduct = itemView.findViewById(R.id.iv_product);
            tvName = itemView.findViewById(R.id.tv_product_name);
            tvPrice = itemView.findViewById(R.id.tv_product_price);
            tvBrand = itemView.findViewById(R.id.tv_product_brand);
            btnRemove = itemView.findViewById(R.id.btn_remove);
        }

        public void bind(final Product product, final OnWishlistItemClickListener listener) {
            tvName.setText(product.getName());
            tvPrice.setText("$" + product.getPrice());
            tvBrand.setText(product.getBrand());

            // Load product image from drawable
            String imageName = product.getImage();
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

            cardView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onProductClick(product);
                }
            });

            btnRemove.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onRemoveFromWishlist(product);
                }
            });
        }
    }
}