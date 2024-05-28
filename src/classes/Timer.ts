import type { Floor } from "./Floor";

export default class Timer {
    number: number; 
    remainingTime: number ; 
    timerElement: HTMLElement; 

    constructor(floor: Floor) {
        this.number = floor.number; 
        this.remainingTime = 0; 
        this.timerElement = this.createTimer(floor); 
    }

    // Method to create and return the HTML element for the timer
    createTimer(floor: Floor): HTMLElement {
        const timerElement = document.createElement('div'); 
        timerElement.id = `timer-${floor.number}`; 
        timerElement.classList.add('timer');
        timerElement.style.display = 'none'; 
        return timerElement; 
    }

    // Method to start the timer with a specified remaining time
    startTimer(remainingTime: number) {
        if (remainingTime > 0) {
            this.remainingTime = remainingTime; 
            this.timerElement.style.display = 'block'; 
            this.timerElement.innerText = `${Math.floor(this.remainingTime)}`; 

            // Set an interval to update the timer every 500 milliseconds (0.5 seconds)
            const interval = setInterval(() => {
                if ( this.remainingTime <= 0.5) {
                    this.timerElement.style.display = 'none'; // Hide the timer element
                    clearInterval(interval); // Clear the interval when time is up
                } else {
                    this.remainingTime -= 0.5; // Decrease the remaining time by 0.5 seconds
                    this.timerElement.innerText = `${Math.floor(this.remainingTime)}`; // Update the displayed time
                }
            }, 500);
        }
    }
}
