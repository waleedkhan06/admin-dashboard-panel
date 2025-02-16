const orderSchema = {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
      {
        name: "userName",
        type: "string",
        title: "User Name",
        description: "Name of the customer",
      },
      {
        name: "userEmail",
        type: "string",
        title: "User Email",
        description: "Email of the customer",
      },
      {
        name: "userPhone",
        type: "string",
        title: "User Phone",
        description: "Phone number of the customer",
      },
      {
        name: "car",
        type: "reference",
        to: [{ type: "car" }], // Reference to car schema
        title: "Car",
        description: "Car being rented",
      },
      {
        name: "pickupLocation",
        type: "string",
        title: "Pickup Location",
        description: "Where the car will be picked up",
      },
      {
        name: "dropOffLocation",
        type: "string",
        title: "Drop-off Location",
        description: "Where the car will be dropped off",
      },
      {
        name: "rentalDays",
        type: "number",
        title: "Rental Duration",
        description: "Number of days the car is rented",
      },
      {
        name: "totalPrice",
        type: "number",
        title: "Total Price",
        description: "Total rental cost",
      },
      {
        name: "status",
        type: "string",
        title: "Order Status",
        options: {
          list: ["Pending", "Confirmed", "Cancelled", "Completed"],
          layout: "dropdown",
        },
        description: "Current status of the order",
      },
      {
        name: "createdAt",
        type: "datetime",
        title: "Order Date",
        description: "Date when the order was placed",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          calendarTodayLabel: "Today",
        },
      },
    ],
  };
  
  export default orderSchema;
  