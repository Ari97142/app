import type { Building } from "./Building";
import type { Floor } from "./Floor";

export class elevatorFactory {
    // Static method to create elevators based on their index
    static createElevator(i: number, numFloors: number, building: Building) {
        if (i % 3 === 0) {
            return new lowerElevator(i, building);
        } else if (i % 3 === 1) {
            return new middleElevator(i, numFloors, building);
        } else {
            return new upperElevator(i, numFloors, building);
        }
    }
}

export abstract class Elevator {
    number: number;
    currentFloor: number;
    destinationFloors: Floor[];
    elevatorImg: HTMLImageElement;
    building: Building;

    // Constructor to initialize the elevator
    constructor(number: number, building: Building) {
        this.number = number;
        this.currentFloor = 0;
        this.destinationFloors = [];
        this.elevatorImg = this.createElevatorImg();
        this.building = building;
    }

    // Method to call the elevator to a specific floor
    call(floor: Floor) {
        this.destinationFloors.push(floor);
        this.move();
    }

    // Method to create the elevator image element
    private createElevatorImg() {
        const elevatorElement = document.createElement("img");
        elevatorElement.classList.add("elevator-img");
        elevatorElement.src = 'elv.png';
        elevatorElement.id = `elevator-${this.number}`;
        return elevatorElement;
    }

    // Method to move the elevator to its next destination
    protected move() {
        // Check if there are any destination floors to visit
        if (this.destinationFloors.length > 0) {
            // Get the next floor number the elevator needs to move to
            const nextFloor = this.getNextFloor().number;
    
            // If the elevator is already at the target floor, log a message and return
            if (this.currentFloor === nextFloor) {
                console.log(`Elevator ${this.number} arrived at floor ${this.currentFloor}`);
                return;
            }
    
            // Calculate the number of floors to move and the duration of the transition
            const floorsToMove = Math.abs(this.currentFloor - nextFloor);
            const transitionDuration = 0.5 * floorsToMove; // 0.5 seconds per floor
    
            // Set the CSS transition duration for the elevator element
            const elevatorElement = this.elevatorImg;
            elevatorElement.style.transition = `top ${transitionDuration}s ease`;
    
            // Update the current floor to the next floor
            this.currentFloor = nextFloor;
            this.updateElevatorPosition(); // Update the visual position of the elevator
    
            // Log the movement of the elevator
            console.log(`Elevator ${this.number} moving to floor ${this.currentFloor}`);
    
            // Set a timeout for the transition duration
            setTimeout(() => {
                // Handle arrival at the floor (e.g., opening doors)
                this.handleArrival();
                // Remove the current destination floor from the list
                
                // Wait for 2 seconds (e.g., to simulate door open/close) before continuing to the next destination
                setTimeout(() => {
                    this.destinationFloors.shift();
                    // Call the move function again to proceed to the next floor
                    this.move();
                }, 2000);
            }, transitionDuration * 1000);
        }
    }
    

    // Method to update the elevator's position based on its current floor
    protected updateElevatorPosition() {
        const elevatorElement = this.elevatorImg;
        const floorHeight = 47; // Height of each floor in pixels
        const topPosition = floorHeight * this.currentFloor; // Calculate the correct top position
        elevatorElement.style.top = `${topPosition}px`;
    }

    // Method to handle the elevator's arrival at a floor
    protected handleArrival() {
        const { currentFloor } = this;
        const floor = this.building.floors[currentFloor];
        if (floor) {
            floor.changeColor();
            floor.playArrivalSound();
        }
    }

    // Method to get the next floor in the destination list
    protected getNextFloor(): Floor {
        return this.destinationFloors[0];
    }
}



class lowerElevator extends Elevator {
    // Constructor to initialize the lower elevator starting at floor 0
    constructor(number: number, building: Building) {
        super(number, building);
        this.currentFloor = 0;
    }
}

class upperElevator extends Elevator {
    // Constructor to initialize the upper elevator starting at the top floor
    constructor(number: number, numFloors: number, building: Building) {
        super(number, building);
        this.currentFloor = numFloors - 1;
    }
}

class middleElevator extends Elevator {
    // Constructor to initialize the middle elevator starting at the middle floor
    constructor(number: number, numFloors: number, building: Building) {
        super(number, building);
        this.currentFloor = Math.floor(numFloors / 2);
    }
}
