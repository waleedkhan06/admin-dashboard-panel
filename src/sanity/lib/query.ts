// const orders = await client.fetch(`
//     *[_type == "order"] | order(createdAt desc) {
//       _id,
//       userName,
//       userEmail,
//       userPhone,
//       car->{
//         _id,
//         name,
//         image{
//           asset->{
//             _id,
//             url
//           }
//         }
//       },
//       pickupLocation,
//       dropOffLocation,
//       rentalDays,
//       totalPrice,
//       status,
//       createdAt
//     }
//   `);
  