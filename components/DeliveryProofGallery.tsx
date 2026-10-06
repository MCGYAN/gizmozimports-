export default function DeliveryProofGallery() {
  const proofs = [
    { title: 'Bulk electronics delivered', detail: 'Accra - 8 cartons, received safely in 22 days' },
    { title: 'Kitchen appliance shipment', detail: 'Tema - mixed appliances, full video proof provided' },
    { title: 'Furniture sourcing order', detail: 'Kumasi - custom chairs with pre-shipping inspection' },
    { title: 'Wholesale goods container', detail: 'Accra - container split with complete tracking updates' },
  ];

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black">Recent delivery proof</h2>
      <p className="mt-2 text-gray-600">Examples of shipments we sourced and delivered to clients in Ghana.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {proofs.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-card border border-gray-200 bg-white">
            <div className="h-32 bg-brand/10 flex items-center justify-center text-brand">
              <i className="ri-truck-line text-4xl" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-brand-black">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
