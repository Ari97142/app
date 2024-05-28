import {Floor} from "./Floor"
import {Elevator, elevatorFactory} from './Elevator';

export  class Building {
    numFloors: number;
    numElevators: number;
    floors: Floor[];
    elevators: Elevator[];
    
    // Constructor to initialize the building with floors and elevators
    constructor(numFloors: number, numElevators: number) {
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.floors = Array.from({ length: numFloors }, (_, i) => new Floor(i, this));
        this.elevators = Array.from({ length: numElevators }, (_, i) => elevatorFactory.createElevator(i, numFloors, this));
    }

    // Method to display the building in the provided container element
    displayBuilding(container: HTMLElement) {
        const buildingElement = document.createElement("div");
        buildingElement.classList.add("building");
        buildingElement.style.setProperty('--numElevators', `${this.numElevators}`);

        const elevatorsRowElement = document.createElement("div");
        elevatorsRowElement.classList.add("elevators-row");

        const floorsElement = document.createElement("div");
        floorsElement.classList.add("floors");

        for (const floor of this.floors) {
            const floorElement = document.createElement("div");
            floorElement.classList.add("floor");

            const { button } = floor.callButton;
            const { timerElement } = floor.timer;
            floorElement.appendChild(button);
            floorElement.appendChild(timerElement);

            floorsElement.appendChild(floorElement);
        }

        buildingElement.appendChild(elevatorsRowElement);
        buildingElement.appendChild(floorsElement);

        for (let i = 0; i < this.elevators.length; i++) {
            const elevatorElement = this.elevators[i].elevatorImg;
            elevatorElement.style.setProperty('--currentFloor', `${this.elevators[i].currentFloor}`);

            elevatorsRowElement.appendChild(elevatorElement);
        }

        container.appendChild(buildingElement);
    }

    
    // Method to find the nearest elevator to the calling floor
    findNearestElevator(callingFloor: Floor): Elevator {
        let minTime = Infinity;
        let nearestElevator: Elevator = this.elevators[0];
        
        // Calculate travel time for each elevator
        for (const elevator of this.elevators) {
            let time = this.calculateTravelTime(elevator, callingFloor);

            if (time < minTime) {
                minTime = time;
                nearestElevator = elevator;
            }
        }

        const { timer } = callingFloor;
        timer.startTimer(minTime);

        return nearestElevator;
    }

    // Method to calculate the travel time of an elevator to a calling floor
    private calculateTravelTime(elevator: Elevator, callingFloor: Floor): number {
        let time = 0;
    
        // If the elevator has destination floors, calculate time based on the last destination
        if (elevator.destinationFloors.length > 0) {
            const lastDestinationFloor = elevator.destinationFloors[elevator.destinationFloors.length - 1];
            const remainingTimeOnTimer = lastDestinationFloor.timer.remainingTime;
            // add the remaining time and more 2 for the stop
            time += remainingTimeOnTimer + 2;
            // Adds the time from the last floor in the destination floors to the current floor
            time += Math.abs(lastDestinationFloor.number - callingFloor.number) * 0.5;
            } else {
                // If no destination floors, calculate time based on current floor
                time += Math.abs(elevator.currentFloor - callingFloor.number) * 0.5;
            }

        return time;
    }

}

