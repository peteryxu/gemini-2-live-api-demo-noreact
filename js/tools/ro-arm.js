import { Logger } from '../utils/logger.js';

export class RoArmTool {
    constructor() {
        // In a real implementation, this would be configurable
        this.roArmIp = "192.168.1.100"; // Placeholder IP
        this.storageLocations = {
            BALLS: "STORAGE_1",
            CUBES: "STORAGE_2",
            OTHER: "STORAGE_3"
        };
    }

    getDeclaration() {
        return [
            {
                name: "pickUp",
                description: "Pick up an object from a specific location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            enum: ["LEFT", "CENTER", "RIGHT"],
                            description: "Location of the object to pick up"
                        }
                    },
                    required: ["location"]
                }
            },
            {
                name: "putDown",
                description: "Put down the currently held object in a storage location",
                parameters: {
                    type: "object",
                    properties: {
                        objectType: {
                            type: "string",
                            enum: ["BALLS", "CUBES", "OTHER"],
                            description: "Type of object to determine storage location"
                        }
                    },
                    required: ["objectType"]
                }
            }
        ];
    }

    async sendRoArmCommand(jsonCommand) {
        const url = `http://${this.roArmIp}/js?json=${encodeURIComponent(JSON.stringify(jsonCommand))}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            Logger.error("Error sending command to RoArm:", error);
            throw error;
        }
    }

    async execute(args) {
        const { name, ...params } = args;

        switch (name) {
            case 'pickUp':
                return await this.handlePickUp(params.location);
            case 'putDown':
                return await this.handlePutDown(params.objectType);
            default:
                throw new Error(`Unknown command: ${name}`);
        }
    }

    async handlePickUp(location) {
        // Placeholder command structure - would need to be adjusted based on actual RoArm-M2 API
        const command = {
            action: "PICKUP",
            position: location
        };

        // await this.sendRoArmCommand(command);
        return `Picked up object from ${location}`;
    }

    async handlePutDown(objectType) {
        const storageLocation = this.storageLocations[objectType];
        
        // Placeholder command structure - would need to be adjusted based on actual RoArm-M2 API
        const command = {
            action: "PUTDOWN",
            position: storageLocation
        };

        // await this.sendRoArmCommand(command);
        return `Put down object in ${storageLocation}`;
    }
} 