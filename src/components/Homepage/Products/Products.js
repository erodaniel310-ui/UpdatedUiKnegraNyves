import Header from "../../Header";

function Products() {
  return (
   <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to our company. We are dedicated to providing the best service to our customers.
            </p>
            <p className="text-lg text-gray-600">
              Our mission is to deliver exceptional value and quality in everything we do.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;