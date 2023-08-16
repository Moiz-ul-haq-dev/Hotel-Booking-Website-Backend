const express = require('express');
const router = express.Router();
const db = require('../database/sql.js');
const stripe = require('stripe')('sk_test_51Nf6L5Id7pugrhpKza2zXC8J6o33gkHwuWPobG3LxWiBqDRdKmHbjLdJKybDN4Zd8Ww0ONXQ4Hsa0UFPHV4VdTaG00LNRYEPLx');

router.post('/', (req, res) => {
    const data = {
        roomNo: req.body.room.roomNo,
        roomType: req.body.room.roomType,
        servantName: req.body.room.servantName,
        pricePerDay: req.body.room.pricePerDay,
        roomImage: req.body.room.roomImage,
        roomDescription: req.body.room.roomDescription,
        roomAvailability: req.body.room.roomAvailability,
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerContact: req.body.customerContact,
        noOfChildren: req.body.noOfChildren,
        noOfAdults: req.body.noOfAdults,
    };
    console.log(data);

    // async function reservation(data) {
    //     await db.collection('tempBookings').insertOne(data, (err, result) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('Room Booked is tempBookings');
    //         }
    //     });
    // }

    async function checkout() {

        const session = await stripe.checkout.sessions.create({
            metadata: {
                roomNo: data.roomNo,
            },
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: data.roomType,
                            images: [`https://sheer-fixed-mask.glitch.me/roomImages/${data.roomImage}`],
                        },
                        unit_amount: data.pricePerDay * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://sheer-fixed-mask.glitch.me/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'https://sheer-fixed-mask.glitch.me/cancel',
        });
        return session.url;
    }
    // reservation(data);
    checkout().then((url) => {
        console.log(url);
        res.json({ url: url });
    });
});


module.exports = router;