export class Car{
    brand;
    model;
    speed;
    isTrunkOpen;

    constructor(carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
        this.speed = carDetails.speed;
        this.isTrunkOpen = carDetails.isTrunkOpen
    }



    displayInfo(brand, model, speed, isTrunkOpen){

        const trunkStatus = this.isTrunkOpen ?'Open' :'Closed';
        // if(this.speed > 0){
        //     this.openTrunk = 'Not working'
        // }

        // if(this.isTrunkOpen = true){
        //     this.go = 'Not possible'
        // }
        console.log(`${this.brand}, ${this.model}, ${this.speed} km/h, ${trunkStatus}`)
    }
    go(speed){

        //injected code
        if(!this.isTrunkOpen){
            this.speed += 5
        }
        if(this.speed > 200){
            this.speed = 200
        }
    }

    break(speed){
        this.speed -= 5
    }

    openTrunk(isTrunkOpen){
        // this.isTrunkOpen = true
        // injected code
        if(Car){
            if(this.isTrunkOpen === 0){
                this.isTrunkOpen = true;
            }
        }
    }
    
    closeTrunk(isTrunkOpen){
        if(Car){
            this.isTrunkOpen = false
        }
    }


}
 
const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolla',
    speed: 100,
    isTrunkOpen: true
})

const car2 = new Car({
    brand: 'Tesla',
    model: 'Model 3',
    speed: 0
})


// car2.displayInfo();


class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails)
        this.acceleration = carDetails.acceleration;
    } 

    go(){
        this.speed += this.acceleration;

        if(this.speed > 300){
            this.speed = 300
        }
    }
    openTrunk(){
        console.log('Race cars do not have a trunk.');
    }

    closeTrunk(){
        console.log('Race cars do not have a trunk.');
    }

}

const raceCar = new RaceCar({
    brand: 'McLaren',
    model: 'F1',
    acceleration: 20,
    speed: 50
}) 
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();



