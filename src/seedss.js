const mongoose=require('mongoose');
const Dish = require("./modul/dish"); 
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/restorent')
.then(()=>{
    console.log("MONGO CONNECTION OPEN")
})
.catch((err)=>{
    console.log('AN ERROR HAS OCCURED')
    console.log(err)
})

         Dish.deleteMany({});
    const dishes = [
      {
        dname: "Paneer Butter Masala",
        dtype: "Vegetarian",
        dprice: 250,
        dtime: "30 minutes",
        photo: "Paneer-Butter-Masala.jpg",
        description: "Creamy paneer cooked in a rich tomato and butter gravy.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Chicken Biryani",
        dtype: "Non-Vegetarian",
        dprice: 350,
        dtime: "1 hour",
        photo: "chicken-biryani.jpg",
        description: "Fragrant rice cooked with succulent chicken and spices.",
        ddiscount: 10,
        dserve: 1
      },
      {
        dname: "Masala Dosa",
        dtype: "Vegetarian",
        dprice: 120,
        dtime: "40 minutes",
        photo: "Masala-dosa-scaled.jpg",
        description: "Crispy crepe made from fermented rice and lentil batter, filled with spicy potato filling.",
        ddiscount: 0,
        dserve: 1
      },
      {
        dname: "Fish Curry",
        dtype: "Non-Vegetarian",
        dprice: 300,
        dtime: "45 minutes",
        photo: "fish curry.jpg",
        description: "Fish cooked in a tangy and spicy coconut-based gravy.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Palak Paneer",
        dtype: "Vegetarian",
        dprice: 220,
        dtime: "40 minutes",
        photo: "Palak-Paneer.jpg",
        description: "Creamy spinach curry with cubes of paneer.",
        ddiscount: 5,
        dserve: 2
      },
      {
        dname: "Chicken Tikka Masala",
        dtype: "Non-Vegetarian",
        dprice: 380,
        dtime: "50 minutes",
        photo: "chicken tikka masala.jpg",
        description: "Grilled chicken pieces cooked in a creamy tomato-based sauce.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Aloo Gobi",
        dtype: "Vegetarian",
        dprice: 180,
        dtime: "35 minutes",
        photo: "Aloo-Gobi.jpg",
        description: "Potato and cauliflower cooked with Indian spices.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Mutton Rogan Josh",
        dtype: "Non-Vegetarian",
        dprice: 400,
        dtime: "1 hour 15 minutes",
        photo: "Mutton-Rogan-Josh.jpg",
        description: "Tender mutton cooked in a flavorful yogurt-based gravy.",
        ddiscount: 15,
        dserve: 1
      },
      {
        dname: "Chole Bhature",
        dtype: "Vegetarian",
        dprice: 200,
        dtime: "1 hour",
        photo: "chole bhature.jpg",
        description: "Spicy chickpea curry served with deep-fried bread.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Butter Chicken",
        dtype: "Non-Vegetarian",
        dprice: 360,
        dtime: "45 minutes",
        photo: "butter-chicken.jpg",
        description: "Tender chicken cooked in a creamy, buttery tomato sauce.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Vegetable Pulao",
        dtype: "Vegetarian",
        dprice: 150,
        dtime: "40 minutes",
        photo: "veg-pulao.jpg",
        description: "Fragrant rice cooked with mixed vegetables and spices.",
        ddiscount: 0,
        dserve: 2
      },
      {
        dname: "Rogan Josh",
        dtype: "Non-Vegetarian",
        dprice: 380,
        dtime: "1 hour",
        photo: "rogan-josh.jpg",
        description: "Tender lamb cooked in a spicy gravy with aromatic spices.",
        ddiscount: 0,
        dserve: 2
      }
    ];
    
   Dish.insertMany(dishes).then(console.log("Seed data inserted successfully"))

