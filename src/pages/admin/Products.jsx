import { useEffect, useState } from "react";

import AdminHeader from "../../components/Admin/AdminHeader";
import ProductTable from "../../components/Admin/ProductTable";
import AddProductModal from "../../components/Admin/AddProductModal";

import {
  subscribeToProducts,
  deleteProduct,
} from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;

    await deleteProduct(product.id);
  };

  return (
    <>
      <AdminHeader onAdd={() => setOpenModal(true)} />

      <ProductTable
        products={products}
        onEdit={(product) => {
          setEditingProduct(product);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      <AddProductModal
        open={openModal}
        product={editingProduct}
        onClose={() => {
          setOpenModal(false);
          setEditingProduct(null);
        }}
      />
    </>
  );
}