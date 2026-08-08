package com.computershop.app.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.computershop.app.R;
import com.computershop.app.models.Product;

import java.util.List;

public class AdminProductsAdapter extends RecyclerView.Adapter<AdminProductsAdapter.ViewHolder> {

    private List<Product> products;
    private OnProductActionListener listener;

    public interface OnProductActionListener {
        void onEditProduct(Product product);
        void onDeleteProduct(Product product);
    }

    public AdminProductsAdapter(List<Product> products, OnProductActionListener listener) {
        this.products = products;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_admin_product, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Product product = products.get(position);
        holder.tvName.setText(product.getName());
        holder.tvCategory.setText(product.getCategory());
        holder.tvPrice.setText("$" + product.getPrice());
        holder.tvStock.setText("Stock: " + product.getStock());
        holder.tvBrand.setText(product.getBrand());

        holder.btnEdit.setOnClickListener(v -> listener.onEditProduct(product));
        holder.btnDelete.setOnClickListener(v -> listener.onDeleteProduct(product));
    }

    @Override
    public int getItemCount() {
        return products.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvCategory, tvPrice, tvStock, tvBrand;
        Button btnEdit, btnDelete;

        ViewHolder(View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tv_product_name);
            tvCategory = itemView.findViewById(R.id.tv_product_category);
            tvPrice = itemView.findViewById(R.id.tv_product_price);
            tvStock = itemView.findViewById(R.id.tv_product_stock);
            tvBrand = itemView.findViewById(R.id.tv_product_brand);
            btnEdit = itemView.findViewById(R.id.btn_edit);
            btnDelete = itemView.findViewById(R.id.btn_delete);
        }
    }
}
