import {BuildingManager} from "./classes/BuildingManager";
import config from '../config/config.json';

class SystemManager {
    buildingManager: BuildingManager;

    constructor() {
        this.buildingManager = new BuildingManager();
    }

    initialize() {
        const addBuildingBtn = document.getElementById('add-building-btn');
        addBuildingBtn?.addEventListener('click', this.buildingManager.promptForBuildingDetails.bind(this.buildingManager));

        this.addBuildingsFromConfig();
    }

    addBuildingsFromConfig() {
        config.buildings.forEach((buildingConfig: { numFloors: number; numElevators: number }) => {
            this.buildingManager.addBuilding(buildingConfig.numFloors, buildingConfig.numElevators);
          });
    }
}

const systemManager = new SystemManager();
systemManager.initialize();