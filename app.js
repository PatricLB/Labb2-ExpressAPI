const { json } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname + '/public'))

const foods =  [
    {id: 1, name: "Pannkaka med sylt och grädde", drink: "Vatten", type: "Efterrätt"},
    {id: 2, name: "Raggmunk med fläsk och löksås", drink: "Pepsi", type: "Lunch"},
    {id: 3, name: "Havregrynsgröt med kanel och mjölk", drink: "Loka Citron", type: "Frukost"},
    {id: 5, name: "Stekt ris med kyckling och currysås", drink: "Mountain Dew", type: "Middag"}
];

const protein = ["Fläskkotlett", "Kycklingfilé", "Kidneyböner",
                 "Entrecoté", "Fläskkotlett", "Lax",
                 "Spenat", "Quorn", "Lammracks",
                 "Svarta böner", "flankstek", "porterstek",
                 "Räkor", "Krabba", "Kräftor",
                 "hummer", "Beef Wellington", "Kryddkorv",
                 "Röding", "Torsk", "Hälleflundra"];

const carb  = ["Kokt Ris", "Kokt potatis", "Makaroner",
              "Morötter", "Glasnudlar", "Pommes",
              "Hasselbackspotatis", "Rostad majs", "Rödbetor",
              "Sparris", "Sötpotatis", "Broccoli",
              "Friterad grönkål", "Potatispuré", "Haricoverts",
              "Stekt ris", "Spaghetti", "Risotto",
              "Hummus"];

const garnish = ["Kebabsås", "Löksås", "Kallsås",
                 "Brunsås", "rödvinsreduktion", "Tzatziki",
                 "bearnaisesås", "Vitlöksås", "Olivolja",
                 "Vitvinsvinäger", "Currysås", "Äggsås",
                 "Tomatconcasse", "Inlagda grönsaker", "Ketchup",
                 "HP sauce", "Pesto", "Majonäs" ];

const drinks = ["RC Cola", "Vatten", "Mountain dew",
                "Lingondricka", "Mjölk", "Oboy",
                "Redbull", "Pepsi Max", "Coca Cola",
                "Dr Pepper", "Loka päron", "Rött vin",
                "Vitt vin", "Folköl", "Ramlösa Granatäpple",
                "Sojamjölk", "Powerking", "Kaffe",
                "Jolt Cola", "Pucko", "Fanta Exotic",
                "G&T"];

const typ = ["Frukost", "Middag", "Lunch", "Mellanmål", "Mellis", "Kvällsmat"];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/random", (req, res) => {
    var randomId = Math.floor(Math.random() * foods.length);
    var randomFoodItem = getRandomFood(randomId);
    res.set("Content-Type", "text/html");
    res.write(`<h2> Du skall äta ${randomFoodItem.name} till ${randomFoodItem.type} och dricka ${randomFoodItem.drink}</h2>`);
    res.send();
});

app.get("/foods", (req, res) => {
    res.send(foods);
});

app.get("/foodsbyid/:foodID", (req, res) => {
    const foodByID = getFoodById(parseInt(req.params.foodID));
    res.send(foodByID);
});

app.get("/newEntry", (req,res) => {
    
    res.send(newEntry());
});

app.get("/delete/:foodID", (req,res) => {
    res.send(removeFood(parseInt(req.params.foodID)));
});

function getFoodById(foodId){
    var index = foods.findIndex( x => x.id === foodId);
    var foodData = foods[index];
    if(index == -1){
        return "Ingen mat med det ID:t"
    }
    else{
        return foodData;
    }
}
function getRandomFood(arrayId){
    var foodData = foods[arrayId];
    return foodData;
}

function removeFood(foodId){
    const index = foods.findIndex( x => x.id === foodId);
    console.log(index);
    if(index < 0){
        console.log("ID:t fanns inte");
        return "Ingen mat med det ID:t";
    }else{
        console.log("ID:t " + foodId + " togs bort");
        foods.splice(index,1);
        return foods;
    }
}

function newEntry(){
    const randomProtein = protein[Math.floor(Math.random() * protein.length)];
    const randomCarb = carb[Math.floor(Math.random() * carb.length)];
    const randomGarnish = garnish[Math.floor(Math.random() * garnish.length)];
    const randomTyp = typ[Math.floor(Math.random() * typ.length)];
    const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];

    var newID = foods.length + 1;
    foods.forEach(element => {
        if(newID === element.id){
            newID++;
        }
    });

    const foodToAdd = {id: newID, name: `${randomCarb} med ${randomProtein} och ${randomGarnish}`,
    drink: randomDrink,
    type: randomTyp
    }
    foods.push(foodToAdd);
return foodToAdd;
}

app.listen(PORT, () => {
console.log(`Listening to port: ${PORT}`);

})