import type { Floor } from "./Floor";

export default class CallButton {
    number: number;
    button: HTMLButtonElement;

    // Constructor to initialize the call button for a floor
    constructor(floor: Floor) {
        this.number = floor.number;
        this.button = this.createButton(floor);
    }

    // Method to create the call button element
    createButton(floor: Floor): HTMLButtonElement {
        const button = document.createElement("button");
        button.innerText = `${this.number}`;
        button.onclick = () => {
            floor.callElevator();
        };
        button.classList.add("metal", "linear");
        return button;
    }
}
