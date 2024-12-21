import { Logger } from '../utils/logger.js';

export class RoArmTool {
    constructor() {
        this.roArmIp = "192.168.1.4";

        // Default position of the arm
        this.ARM_DEFAULT_POSITION = {
            T: 1041,
            x: 200,
            y: 4,
            z: -10,
            b: 0,
            s: 0,
            e: 3,
            t: 3,
            torB: 0,    
            torS: 270,
            torE: 0,
            torH: 0
        };

        // JSON commands to find and hold the object with gripper that is on the left side
        this.ARM_LEFT_POSITION = {
            // Placeholder values   
        };
        this.ARM_LEFT_POSITION_CLOSE_GRIPPER = {
            // Placeholder values   
        };

        // JSON commands to find and hold the object with gripper that is on the center side
        this.ARM_CENTER_POSITION = {
            // Placeholder values   
        };
        this.ARM_CENTER_POSITION_CLOSE_GRIPPER = {
            // Placeholder values   
        };

        // JSON commands to find and hold the object with gripper that is on the right side
        this.ARM_RIGHT_POSITION = {
            // Placeholder values   
        };
        this.ARM_RIGHT_POSITION_CLOSE_GRIPPER = {
            // Placeholder values   
        };

        // JSON command to move the arm in front of the camera to show the object
        this.ARM_CAMERA_POSITION = {
            // Placeholder values   
        };

        // JSON commands to move the arm to the storage location for balls and release the gripper
        this.BALLS_POSITION = {
            // Placeholder values   
        };
        this.BALLS_POSITION_OPEN_GRIPPER = {
            // Placeholder values   
        };

        // JSON commands to move the arm to the storage location for cubes and release the gripper
        this.CUBES_POSITION = {
            // Placeholder values   
        };
        this.CUBES_POSITION_OPEN_GRIPPER = {
            // Placeholder values   
        };

        // JSON commands to move the arm to the storage location for other objects and release the gripper
        this.OTHER_POSITION = {
            // Placeholder values   
        };  
        this.OTHER_POSITION_OPEN_GRIPPER = {
            // Placeholder values   
        };
        
        // All of the above but in dict for better accessiblity
        this.COMMANDS = {
            LEFT_COMMAND: [this.ARM_LEFT_POSITION, this.ARM_LEFT_POSITION_CLOSE_GRIPPER, ],
            CENTER_COMMAND: [this.ARM_CENTER_POSITION, this.ARM_CENTER_POSITION_CLOSE_GRIPPER],
            RIGHT_COMMAND: [this.ARM_RIGHT_POSITION, this.ARM_RIGHT_POSITION_CLOSE_GRIPPER],

            BALLS_COMMAND: [this.BALLS_POSITION, this.BALLS_POSITION_OPEN_GRIPPER],
            CUBES_COMMAND: [this.CUBES_POSITION, this.CUBES_POSITION_OPEN_GRIPPER],
            OTHER_COMMAND: [this.OTHER_POSITION, this.OTHER_POSITION_OPEN_GRIPPER], 
        }   
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

        if (location === "LEFT") {
            await this.sendRoArmCommand(this.COMMANDS.LEFT_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.LEFT_COMMAND[1]);
        }
        else if (location === "CENTER") {
            await this.sendRoArmCommand(this.COMMANDS.CENTER_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.CENTER_COMMAND[1]);
        }
        else if (location === "RIGHT") {
            await this.sendRoArmCommand(this.COMMANDS.RIGHT_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.RIGHT_COMMAND[1]);
        }
        else {
            throw new Error(`Invalid location: ${location}`);
        }

        return `Picked up object from ${location}`;
    }

    async handlePutDown(objectType) {
        if (objectType === "BALLS") {
            await this.sendRoArmCommand(this.COMMANDS.BALLS_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.BALLS_COMMAND[1]);
        }
        else if (objectType === "CUBES") {
            await this.sendRoArmCommand(this.COMMANDS.CUBES_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.CUBES_COMMAND[1]);
        }   
        else if (objectType === "OTHER") {
            await this.sendRoArmCommand(this.COMMANDS.OTHER_COMMAND[0]);
            await this.sendRoArmCommand(this.COMMANDS.OTHER_COMMAND[1]);
        }
        else {
            throw new Error(`Invalid object type: ${objectType}`);
        }   

        await this.sendRoArmCommand(this.ARM_DEFAULT_POSITION);
        return `Put down object in ${objectType}`;
    }
} 