import { uploadImage } from "../../services/cloudinaryService";
import toast from "react-hot-toast";
import {
  addProduct,
  updateProduct,
} from "../../services/productService";
import { useEffect, useState } from "react";
import {
  Tag,
  LayoutGrid,
  BadgePercent,
  Wallet,
  Boxes,
  Star,
  ImagePlus,
  UploadCloud,
  X,
  FileText,
  Ruler,
  Palette,
  Sparkles,
  Save,
} from "lucide-react";

const categories = [
  "Men",
  "Women",
  "Shoes",
  "Bags",
  "Accessories",
];

const badges = [
  "NEW",
  "HOT",
  "SALE",
];

const availableSizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];

const availableColors = [
  "Black",
  "White",
  "Brown",
  "Blue",
  "Gray",
];

export default function ProductForm({
  product,
  onClose,
  onSuccess,
}) {
const [form, setForm] = useState({
  name: "",
  category: "Men",
  badge: "NEW",

  price: "",
  oldPrice: "",

  stock: "",
  rating: 5,

  description: "",

  images: [],

  colors: [],

  sizes: [],

  featured: false,
});


useEffect(() => {
  if (!product) return;

  setForm({
    name: product.name || "",
    category: product.category || "Men",
    badge: product.badge || "NEW",

    price: product.price || "",
    oldPrice: product.oldPrice || "",

    stock: product.stock || "",
    rating: product.rating || 5,

    description: product.description || "",

    images: product.images || [],

    colors: product.colors || [],

    sizes: product.sizes || [],

    featured: product.featured || false,
  });
}, [product]);

const [uploading, setUploading] = useState(false);

const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);

  if (!files.length) return;

  setUploading(true);

  try {
    const urls = [];

    for (const file of files) {
      const image = await uploadImage(file);
      urls.push(image);
    }

    setForm({
      ...form,
      images: [...form.images, ...urls],
    });

    toast.success("Images uploaded successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to upload images");
  } finally {
    setUploading(false);
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = {
      ...form,
      price: Number(form.price),
      oldPrice: Number(form.oldPrice),
      stock: Number(form.stock),
      rating: Number(form.rating),
    };

    if (product) {
      await updateProduct(product.id, data);

      toast.success("Product updated successfully!");
    } else {
      await addProduct(data);

      toast.success("Product added successfully!");
    }

    setForm({
      name: "",
      category: "Men",
      badge: "NEW",
      price: "",
      oldPrice: "",
      stock: "",
      rating: 5,
      description: "",
      images: [],
      colors: [],
      sizes: [],
      featured: false,
    });

    onSuccess?.();
    onClose?.();

  } catch (error) {
    console.error(error);

    toast.error("Failed to save product.");
  }
};

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
   <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

      {/* Basic Info */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
            <Tag size={15} strokeWidth={2.25} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Product Details
          </h3>
        </div>

        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Product Name
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          />
        </div>
      </div>

      {/* Classification */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
            <LayoutGrid size={15} strokeWidth={2.25} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Classification
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            >
              {categories.map(category => (
                <option key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="badge" className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <BadgePercent size={14} className="text-gray-400" />
              Badge
            </label>

            <select
              id="badge"
              name="badge"
              value={form.badge}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            >
              {badges.map(badge => (
                <option key={badge}>
                  {badge}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Pricing */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
            <Wallet size={15} strokeWidth={2.25} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Pricing
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-700">
              Price
            </label>

           <input
  id="price"
  type="number"
  name="price"
  value={form.price}
  onChange={handleChange}
  className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
/>
          </div>

          <div>
            <label htmlFor="oldPrice" className="mb-2 block text-sm font-medium text-gray-700">
              Old Price
            </label>

            <input
              id="oldPrice"
              type="number"
              name="oldPrice"
              value={form.oldPrice}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            />
          </div>

        </div>
      </div>

      {/* Inventory & Rating */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
            <Boxes size={15} strokeWidth={2.25} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Inventory &amp; Rating
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label htmlFor="stock" className="mb-2 block text-sm font-medium text-gray-700">
              Stock
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            />
          </div>

          <div>
            <label htmlFor="rating" className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Star size={14} className="text-gray-400" />
              Rating
            </label>

            <input
              id="rating"
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
            />
          </div>

        </div>
      </div>

    {/* Product Images */}
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
          <ImagePlus size={15} strokeWidth={2.25} />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
          Product Images
        </h3>
      </div>

  <div className="relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/60 px-6 py-10 text-center transition-colors duration-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D4AF37] shadow-sm ring-1 ring-gray-100">
      <UploadCloud size={20} strokeWidth={1.75} />
    </span>

    <p className="text-sm font-medium text-gray-700">
      Drag &amp; drop images, or{" "}
      <span className="text-[#B8952E] underline underline-offset-2">browse</span>
    </p>
    <p className="text-xs text-gray-400">PNG, JPG up to a few MB each</p>

    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImageUpload}
      aria-label="Upload product images"
      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
    />
  </div>

  {uploading && (
    <p className="mt-4 flex items-center gap-2 text-sm font-medium text-[#B8952E]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4AF37]" />
      Uploading images...
    </p>
  )}

  <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
    {form.images.map((image, index) => (
      <div
        key={index}
        className="group relative overflow-hidden rounded-xl ring-1 ring-gray-100"
      >
        <img
          src={image}
          alt={`Product ${index + 1}`}
          className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              images: form.images.filter(
                (_, i) => i !== index
              ),
            })
          }
          aria-label={`Remove image ${index + 1}`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#D4AF37]"
        >
          <X size={14} strokeWidth={2.25} />
        </button>
      </div>
    ))}
  </div>
</div>

      {/* Description */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
            <FileText size={15} strokeWidth={2.25} />
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
            Description
          </h3>
        </div>

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-label="Product description"
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 p-4 outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
        />
      </div>

{/* Sizes */}
<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
  <div className="mb-6 flex items-center gap-2.5">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
      <Ruler size={15} strokeWidth={2.25} />
    </span>
    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
      Sizes
    </h3>
  </div>

  <div className="flex flex-wrap gap-3">

    {availableSizes.map((size) => (

      <button
        key={size}
        type="button"
        onClick={() => {

          if (form.sizes.includes(size)) {

            setForm({
              ...form,
              sizes: form.sizes.filter(
                (item) => item !== size
              ),
            });

          } else {

            setForm({
              ...form,
              sizes: [...form.sizes, size],
            });

          }

        }}
        aria-pressed={form.sizes.includes(size)}
        className={`min-w-[3.25rem] rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
          form.sizes.includes(size)
            ? "border-black bg-black text-white shadow-md"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
        }`}
      >

        {size}

      </button>

    ))}
  </div>
</div>

<div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

  <div className="mb-6 flex items-center gap-2.5">
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
      <Palette size={15} strokeWidth={2.25} />
    </span>
    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
      Colors
    </h3>
  </div>

  <div className="flex flex-wrap gap-3">

    {availableColors.map((color)=>(

      <button
        key={color}
        type="button"
        onClick={() => {

          if(form.colors.includes(color)){

            setForm({
              ...form,
              colors: form.colors.filter(
                (item)=>item!==color
              ),
            });

          }else{

            setForm({
              ...form,
              colors:[
                ...form.colors,
                color,
              ],
            });

          }

        }}
        aria-pressed={form.colors.includes(color)}
        className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
          form.colors.includes(color)
          ? "border-[#D4AF37] bg-[#D4AF37] text-white shadow-md"
          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
        }`}
      >

        {color}

      </button>

    ))}

  </div>

</div>

<div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
      <Sparkles size={16} strokeWidth={2} />
    </span>
    <div>
      <h4 className="font-semibold text-gray-900">
        Featured Product
      </h4>

      <p className="text-sm text-gray-500">
        Show on homepage.
      </p>
    </div>
  </div>

  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      checked={form.featured}
      onChange={(e)=>
        setForm({
          ...form,
          featured:e.target.checked,
        })
      }
      aria-label="Toggle featured product"
      className="peer sr-only"
    />
    <div className="h-7 w-12 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-[#D4AF37] peer-focus-visible:ring-offset-2" />
    <div className="pointer-events-none absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 peer-checked:translate-x-5 peer-checked:bg-[#D4AF37]" />
  </label>

</div>
      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-black to-gray-900 font-semibold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-[#D4AF37] hover:to-[#B8952E] hover:shadow-[0_10px_30px_rgba(212,175,55,0.35)] active:translate-y-0"
      >
       <Save size={17} strokeWidth={2.25} />
       {product ? "Update Product" : "Save Product"}
      </button>

    </form>
  );
}