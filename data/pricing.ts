

export const pricingTypes = [

    { 
         name : "Free" , 
         price : 0 , 
         priceId : "", 
         fileSize : 20,
         discounts : "", 
         numOfQuizzes : 20,
         description : "For Students",
         support : true , 

    },
    
   { 
         name : "Pro" , 
         price : 39 , 
         priceId : "price_1RQJoOPiYnN9p7DJX7ontoG1", 
         support : true , 
         fileSize : 50,
         numOfQuizzes : "Unlimited",
         discounts : 50,
         description : "For Undergraduates"

    },
]

export type Pricing = typeof pricingTypes[0]