const db = require('./models/model.js');

const query = `insert into products(name,description,quantity,price,image_url) values 
('Red Silk Saree with White Border', 'A classic red silk saree with a pristine white border, ideal for weddings and festive rituals.', 10, 2499.00, '/images/1.red-white.jpg'),
('Onion Pink Silk Saree', 'This elegant onion-colored silk saree with a pink border adds a soft charm to evening celebrations.', 8, 2299.00, '/images/2.onion-color-pink.jpg'),
('Purple and Pink Silk Saree', 'Radiate grace in this royal purple silk saree featuring a vibrant pink border, perfect for family functions.', 7, 2399.00, '/images/3.purple-pink.jpg'),
('Blue and Pink Silk Saree', 'A serene blue silk saree with a contrasting pink border that blends tradition with style — ideal for pujas.', 12, 2199.00, '/images/4.blue-pink.jpg'),
('Green and Blue Silk Saree', 'A refreshing green silk saree with a subtle blue border, designed for day-time gatherings and temple visits.', 9, 2099.00, '/images/5.green-blue.jpg'),
('Yellow and Purple Silk Saree', 'Bright and cheerful, this yellow silk saree with a rich purple border brings joy to festive mornings.', 11, 2499.00, '/images/6.yellow-purple.jpg'),
('Pink and Purple Silk Saree', 'Celebrate femininity in this charming pink silk saree with a graceful purple border — perfect for receptions.', 6, 2599.00, '/images/7.pink-purple.jpg'),
('Pink Silk Saree with Zari Border', 'A luxurious pink silk saree adorned with a shimmering zari border, crafted for grand occasions.', 5, 2799.00, '/images/8.pink-zari.jpg'),
('Yellow and Blue Silk Saree', 'Stand out in this radiant yellow silk saree with a cool blue border, great for cultural and festive programs.', 10, 2299.00, '/images/9.yellow-blue.jpg'),
('Classic Blue Silk Saree', 'A deep blue silk saree with a matching tone-on-tone border that speaks of elegance and timeless beauty.', 7, 2199.00, '/images/10.blue.jpg');`

db.query(query, (err, result)=>{
    if(err){
        console.log("error", err);
    } else{
        console.log("inserted");
    }
});