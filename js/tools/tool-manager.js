import { Logger } from '../utils/logger.js';
import { ApplicationError, ErrorCodes } from '../utils/error-boundary.js';
import { GoogleSearchTool } from './google-search.js';
import { WeatherTool } from './weather-tool.js';
import { RoArmTool } from './ro-arm.js';

export class ToolManager {
    constructor() {
        this.tools = new Map();
        this.registerDefaultTools();
    }

    registerDefaultTools() {
        this.registerTool('googleSearch', new GoogleSearchTool());
        this.registerTool('weather', new WeatherTool());
        this.registerTool('roArm', new RoArmTool());
    }

    registerTool(name, toolInstance) {
        if (this.tools.has(name)) {
            throw new ApplicationError(
                `Tool ${name} is already registered`,
                ErrorCodes.INVALID_STATE
            );
        }
        this.tools.set(name, toolInstance);
        Logger.info(`Tool ${name} registered successfully`);
    }

    getToolDeclarations() {
        const allDeclarations = [];
        
        this.tools.forEach((tool, name) => {
            if (tool.getDeclaration) {
                if (name === 'roArm' || name === 'weather') {
                    allDeclarations.push({
                        functionDeclarations: tool.getDeclaration()
                    });
                } else {
                    allDeclarations.push({ [name]: tool.getDeclaration() });
                }
            }
        });

        return allDeclarations;
    }

    async handleToolCall(functionCall) {
        const { name, args, id } = functionCall;
        Logger.info(`Handling tool call: ${name}`, { args });

        let tool;
        if (name === 'get_weather_on_date') {
            tool = this.tools.get('weather');
        } else {
            tool = this.tools.get(name);
        }

        if (!tool) {
            throw new ApplicationError(
                `Unknown tool: ${name}`,
                ErrorCodes.INVALID_PARAMETER
            );
        }

        try {
            const result = await tool.execute(args);
            return {
                functionResponses: [{
                    response: { output: result },
                    id
                }]
            };
        } catch (error) {
            Logger.error(`Tool execution failed: ${name}`, error);
            return {
                functionResponses: [{
                    response: { error: error.message },
                    id
                }]
            };
        }
    }
} 