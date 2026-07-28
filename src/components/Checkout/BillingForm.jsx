import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Hash,
  Home,
  Truck,
} from "lucide-react";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

/**
 * Small presentational helper for a floating-label input.
 * Purely visual — it still renders a plain <input> that receives the
 * exact same name / value / onChange props BillingForm already passes,
 * so formData and handleChange behavior is unchanged.
 */
function FloatingInput({
  label,
  icon: Icon,
  className = "",
  ...inputProps
}) {
  return (
    <div className={`relative ${className}`}>
      {Icon && (
        <Icon
          size={17}
          strokeWidth={1.75}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#B8952E]"
        />
      )}

      <input
        {...inputProps}
        placeholder=" "
        className={`peer h-14 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 ${
          Icon ? "pl-11" : ""
        } text-[15px] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)] ${
          inputProps.readOnly ? "cursor-not-allowed bg-gray-100 text-gray-500" : ""
        }`}
      />

      <label
        className={`pointer-events-none absolute ${
          Icon ? "left-11" : "left-4"
        } top-1/2 -translate-y-1/2 text-[15px] text-gray-400 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-[15px] peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-white peer-focus:px-1.5 peer-focus:text-xs peer-focus:font-medium peer-focus:text-[#B8952E] ${
          inputProps.value ? "-top-2.5 left-3 bg-white px-1.5 text-xs font-medium text-gray-500" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function BillingForm({
  formData,
  setFormData,
}) {

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-10"
    >
      {/* Section title + description */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-semibold tracking-wide text-black md:text-3xl">
          Billing Details
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Enter your details exactly as they appear on your delivery address.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <FloatingInput
          label="First Name"
          icon={User}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <FloatingInput
          label="Last Name"
          icon={User}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <FloatingInput
          label="Email Address"
          icon={Mail}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <FloatingInput
          label="Phone Number"
          icon={Phone}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <FloatingInput
          label="Country"
          icon={Globe}
          type="text"
          name="country"
          value={formData.country}
          readOnly
        />

        {/* State — kept as a native select for full functionality,
           restyled with a matching icon and custom chevron */}
        <div className="relative">
          <MapPin
            size={17}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="h-14 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-10 text-[15px] outline-none transition-all duration-200 focus:border-[#D4AF37] focus:bg-white focus:shadow-[0_0_0_4px_rgba(212,175,55,0.12)]"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>

          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <FloatingInput
          label="City"
          icon={Building2}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="md:col-span-2"
        />

        <FloatingInput
          label="Street Address"
          icon={Home}
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="md:col-span-2"
        />

        <FloatingInput
          label="Apartment (Optional)"
          icon={Home}
          type="text"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
        />

        <FloatingInput
          label="ZIP / Postal Code"
          icon={Hash}
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />

      </div>

      {/* Optional delivery information note — purely informational,
         no state, no logic, just a reassuring luxury-retail touch */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#B8952E]">
          <Truck size={16} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-semibold text-gray-800">Delivery Information</p>
          <p className="mt-0.5 text-sm text-gray-500">
            Orders are typically delivered within 3–7 business days. You'll receive tracking details by email once your order ships.
          </p>
        </div>
      </div>

    </motion.div>
  );
}