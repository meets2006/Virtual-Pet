class Food{
    constructor(x,y,width,height){
        var foodStock
        var lastFed
    

    this.image = loadImage("Milk.png")

}
    getFoodStock(){
        database.ref("Food").on("value", function (data){
            foodStock=data.val()
        })
    }
    updateFoodStock(stock){
        database.ref("Food").update({
            Food:stock
        })
    }
    deductFood(){
        foodStock=foodStock-1;
    }
    display(){
       var x=80,y=100;
       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodStock=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
       }
    }

}