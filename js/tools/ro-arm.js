import { Logger } from '../utils/logger.js';

export class RoArmTool {
    constructor() {
        this.roArmIp = "192.168.1.4";

        // Default position of the arm
        // {"T":1041,"x":229.7000215,"y":2.818984873,"z":-37.53525214,"b":0.012271846,"s":0.334407812,"e":2.350058567,"t":2.195126507,"torB":0,"torS":168,"torE":0,"torH":0}
        this.ARM_DEFAULT_POSITION = {
            T: 1041,
            x: 229.7000215,
            y: 2.818984873,
            z: -37.53525214,
            b: 0.012271846,
            s: 0.334407812,
            e: 2.350058567,
            t: 2.195126507,
            torB: 0,
            torS: 168,
            torE: 0,
            torH: 0 
        };

        // JSON commands to find and hold the object with gripper that is on the left side
        // {"T":1041,"x":159.4301008,"y":107.9486341,"z":-117.1720323,"b":0.595184546,"s":0.696427278,"e":2.382272164,"t":2.201262431,"torB":164,"torS":0,"torE":0,"torH":0}
        this.ARM_LEFT_POSITION = {
            T: 1041,
            x: 159.4301008,
            y: 107.9486341,
            z: -117.1720323,
            b: 0.595184546,
            s: 0.696427278,
            e: 2.382272164,
            t: 2.201262431,
            torB: 164,
            torS: 0,
            torE: 0,
            torH: 0
        };
        // {"T":1041,"x":154.9680443,"y":114.5640794,"z":-116.8765451,"b":0.636602027,"s":0.694893297,"e":2.382272164,"t":2.905359612,"torB":0,"torS":0,"torE":0,"torH":-300}
        this.ARM_LEFT_POSITION_CLOSE_GRIPPER = {
            T: 1041,
            x: 154.9680443,
            y: 114.5640794,
            z: -116.8765451,
            b: 0.636602027,
            s: 0.694893297,
            e: 2.382272164,
            t: 2.905359612,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: -300
        };

        // JSON commands to find and hold the object with gripper that is on the center side
        // {"T":1041,"x":192.5234587,"y":2.362736904,"z":-117.1720323,"b":0.012271846,"s":0.696427278,"e":2.382272164,"t":2.195126507,"torB":0,"torS":0,"torE":52,"torH":0}
        this.ARM_CENTER_POSITION = {
            T: 1041,
            x: 192.5234587,
            y: 2.362736904,
            z: -117.1720323,
            b: 0.012271846,
            s: 0.696427278,
            e: 2.382272164,
            t: 2.195126507,
            torB: 0,
            torS: 0,
            torE: 52,
            torH: 0
        };
        // {"T":1041,"x":192.5234587,"y":2.362736904,"z":-117.1720323,"b":0.012271846,"s":0.696427278,"e":2.382272164,"t":2.86240815,"torB":0,"torS":0,"torE":0,"torH":-68}
        this.ARM_CENTER_POSITION_CLOSE_GRIPPER = {
            T: 1041,
            x: 192.5234587,
            y: 2.362736904,
            z: -117.1720323,
            b: 0.012271846,
            s: 0.696427278,
            e: 2.382272164,
            t: 2.86240815,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: -68
        };

        // JSON commands to find and hold the object with gripper that is on the right side
        // {"T":1041,"x":147.3860443,"y":-122.4777206,"z":-118.645319,"b":-0.693359316,"s":0.704097182,"e":2.382272164,"t":2.202796411,"torB":92,"torS":20,"torE":0,"torH":0}
        this.ARM_RIGHT_POSITION = {
            T: 1041,
            x: 147.3860443,
            y: -122.4777206,
            z: -118.645319,
            b: -0.693359316,
            s: 0.704097182,
            e: 2.382272164,
            t: 2.202796411,
            torB: 92,
            torS: 20,
            torE: 0,
            torH: 0
        };
        // {"T":1041,"x":146.0446509,"y":-117.6230485,"z":-125.0437053,"b":-0.678019508,"s":0.737844759,"e":2.382272164,"t":2.8424664,"torB":0,"torS":0,"torE":0,"torH":-72}
        this.ARM_RIGHT_POSITION_CLOSE_GRIPPER = {
            T: 1041,
            x: 146.0446509,
            y: -117.6230485,
            z: -125.0437053,
            b: -0.678019508,
            s: 0.737844759,
            e: 2.382272164,
            t: 2.8424664,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: -72
        };

        // JSON command to move the arm in front of the camera to show the object
        // {"T":1041,"x":267.6837561,"y":-229.4770504,"z":105.7637137,"b":-0.708699124,"s":0.288388388,"e":1.696582751,"t":2.857806208,"torB":-196,"torS":0,"torE":20,"torH":0}
        this.ARM_CAMERA_POSITION = {
            T: 1041,
            x: 267.6837561,
            y: -229.4770504,
            z: 105.7637137,
            b: -0.708699124,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.857806208,
            torB: -196,
            torS: 0,
            torE: 20,
            torH: 0
        };

        // JSON commands to move the arm to the storage location for balls and release the gripper
        // {"T":1041,"x":-138.4173672,"y":324.2760281,"z":105.7637137,"b":1.974233274,"s":0.288388388,"e":1.696582751,"t":2.857806208,"torB":268,"torS":0,"torE":0,"torH":0}
        this.BALLS_POSITION = {
            T: 1041,
            x: -138.4173672,
            y: 324.2760281,
            z: 105.7637137,
            b: 1.974233274,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.857806208,
            torB: 268,
            torS: 0,
            torE: 0,
            torH: 0
        };
        // {"T":1041,"x":-149.7698161,"y":319.1916543,"z":105.7637137,"b":2.009514832,"s":0.288388388,"e":1.696582751,"t":2.474311011,"torB":0,"torS":0,"torE":0,"torH":32}
        this.BALLS_POSITION_OPEN_GRIPPER = {
            T: 1041,
            x: -149.7698161,
            y: 319.1916543,
            z: 105.7637137,
            b: 2.009514832,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.474311011,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: 32
        };

        // JSON commands to move the arm to the storage location for cubes and release the gripper
        // {"T":1041,"x":-351.8508375,"y":22.70017899,"z":105.7637137,"b":3.07716546,"s":0.288388388,"e":1.696582751,"t":2.851670285,"torB":180,"torS":0,"torE":0,"torH":0}
        this.CUBES_POSITION = {
            T: 1041,
            x: -351.8508375,
            y: 22.70017899,
            z: 105.7637137,
            b: 3.07716546,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.851670285,
            torB: 180,
            torS: 0,
            torE: 0,
            torH: 0
        };
        // {"T":1041,"x":-351.8508375,"y":22.70017899,"z":105.7637137,"b":3.07716546,"s":0.288388388,"e":1.696582751,"t":2.205864373,"torB":0,"torS":0,"torE":0,"torH":96}
        this.CUBES_POSITION_OPEN_GRIPPER = {
            T: 1041,
            x: -351.8508375,
            y: 22.70017899,
            z: 105.7637137,
            b: 3.07716546,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.205864373,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: 96
        };

        // JSON commands to move the arm to the storage location for other objects and release the gripper
        // {"T":1041,"x":-147.3172655,"y":-320.3309745,"z":105.7637137,"b":-2.001844928,"s":0.288388388,"e":1.696582751,"t":2.845534362,"torB":-112,"torS":0,"torE":0,"torH":0}
        this.OTHER_POSITION = {
            T: 1041,
            x: -147.3172655,
            y: -320.3309745,
            z: 105.7637137,
            b: -2.001844928,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.845534362,
            torB: -112,
            torS: 0,
            torE: 0,
            torH: 0
        };  
        // {"T":1041,"x":-147.3172655,"y":-320.3309745,"z":105.7637137,"b":-2.001844928,"s":0.288388388,"e":1.696582751,"t":2.230408066,"torB":0,"torS":0,"torE":0,"torH":52}
        this.OTHER_POSITION_OPEN_GRIPPER = {
            T: 1041,
            x: -147.3172655,
            y: -320.3309745,
            z: 105.7637137,
            b: -2.001844928,
            s: 0.288388388,
            e: 1.696582751,
            t: 2.230408066,
            torB: 0,
            torS: 0,
            torE: 0,
            torH: 52
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