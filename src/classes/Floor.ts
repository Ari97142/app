import CallButton from "./CallButton"
import Timer from "./Timer"
import type {Building} from "./Building"

export class Floor {
    number: number; 
    callButton: CallButton; 
    timer: Timer; 
    building: Building; 

    constructor(number: number, building: Building) {
        this.number = number;
        this.callButton = new CallButton(this); 
        this.timer = new Timer(this); 
        this.building = building; 
    }

    // Method to call the nearest elevator to this floor
    callElevator() {
        const elevator = this.building.findNearestElevator(this); // Find the nearest elevator
        if (this.anElevatorOnFloor() || this.anElevatorEnRoute()) {
            console.log(`An elevator is already present or en route to floor ${this.number}.`);
            return;
        } else {
            this.changeColor(); 
            elevator.call(this); 
            console.log(`Elevator ${elevator.number} called to floor ${this.number}`);
        }
    }

    // Private method to check if an elevator is already on this floor
    private anElevatorOnFloor(): boolean {
        for (const elevator of this.building.elevators) {
            if (elevator.currentFloor === this.number) {
                return true; // Elevator is on this floor
            }
        }
        return false; // No elevator on this floor
    }

    // Private method to check if an elevator is en route to this floor
    private anElevatorEnRoute(): boolean {
        for (const elevator of this.building.elevators) {
            for (const floor of elevator.destinationFloors) {
                if (floor.number === this.number) {
                    return true; // Elevator is en route to this floor
                }
            }
        }
        return false; // No elevator en route to this floor
    }

    // Method to change the color of the call button
    changeColor() {
        const { button } = this.callButton;
        if (button.style.color === 'green') {
            button.style.color = 'hsla(0, 0%, 15%, 0.8)'; // Set button color to default
        } else {
            button.style.color = 'green'; // Set button color to green
        }
    }

    // Method to play the arrival sound when the elevator arrives
    playArrivalSound() {
        const audio = new Audio('ding.mp3'); // Create a new audio object
        audio.play(); // Play the arrival sound
    }

}
