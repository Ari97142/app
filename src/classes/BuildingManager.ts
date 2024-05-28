import { Building } from './Building';

export class BuildingManager {
  buildings: Building[] = [];

  // Prompt user for building details
  promptForBuildingDetails() {
    const numFloors = parseInt(prompt('Enter number of floors:') || '0');
    const numElevators = parseInt(prompt('Enter number of elevators:') || '0');

    if (numFloors > 0 && numElevators > 0) {
      this.addBuilding(numFloors, numElevators);
    } else {
      alert('Invalid input. Please enter positive integers.');
    }
  }

  // Add a new building
  addBuilding(numFloors: number, numElevators: number) {
    const building = new Building(numFloors, numElevators);
    this.buildings.push(building);
    const buildingContainer = document.getElementById('building-container');
    if (buildingContainer) {
      building.displayBuilding(buildingContainer);
    }
  }
}
