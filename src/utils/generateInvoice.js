import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateInvoice(order) {
  const doc = new jsPDF();

  // Brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("KNEGRA NYVES", 14, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Luxury Fashion & Lifestyle",
    14,
    28
  );

  doc.text(
    "support@knegranyves.com",
    14,
    35
  );

  doc.text(
    "+234 xxx xxx xxxx",
    14,
    42
  );

  // Invoice Info

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);

  doc.text("INVOICE", 150, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  doc.text(`Invoice #: ${order.id}`, 150, 30);

  doc.text(
    `Status: ${order.status}`,
    150,
    37
  );

  doc.text(
    `Payment: ${order.paymentMethod}`,
    150,
    44
  );

  // Customer

  doc.setFont("helvetica", "bold");

  doc.text("Bill To", 14, 60);

  doc.setFont("helvetica", "normal");

  doc.text(
    `${order.customer.firstName} ${order.customer.lastName}`,
    14,
    68
  );

  doc.text(
    order.customer.email,
    14,
    75
  );

  doc.text(
    order.customer.phone,
    14,
    82
  );

  doc.text(
    `${order.customer.address}, ${order.customer.city}`,
    14,
    89
  );

  autoTable(doc, {
    startY: 100,

    head: [["Product", "Qty", "Price", "Total"]],

    body: order.items.map(item => [
      item.name,
      item.quantity,
      `₦${item.price.toLocaleString()}`,
      `₦${(
        item.price *
        item.quantity
      ).toLocaleString()}`
    ]),

    headStyles: {
      fillColor: [0, 0, 0],
    },

    styles: {
      fontSize: 10,
    },
  });

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFont("helvetica", "bold");

  doc.text(
    `Subtotal: ₦${order.total.toLocaleString()}`,
    140,
    finalY
  );

  doc.text(
    `Shipping: Free`,
    140,
    finalY + 8
  );

  doc.setFontSize(14);

  doc.text(
    `Grand Total: ₦${order.total.toLocaleString()}`,
    140,
    finalY + 20
  );

  doc.setFontSize(10);

  doc.setFont("helvetica", "italic");

  doc.text(
    "Thank you for shopping with Knegra Nyves.",
    14,
    285
  );

  doc.save(`Invoice-${order.id}.pdf`);
}