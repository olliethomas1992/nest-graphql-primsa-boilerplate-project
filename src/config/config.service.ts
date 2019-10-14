import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * Interface of the Environment Config
 *
 * @interface EnvConfig
 */
interface EnvConfig {
    [key: string]: string;
}

/**
 * App Configuration Service
 *
 * @export
 * @class ConfigService
 */
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }

    /**
     * Validates the configuration service.
     *
     * @param {EnvConfig} envConfig
     * @returns {EnvConfig}
     * @memberof ConfigService
     */
    validateInput(envConfig: EnvConfig): EnvConfig {
        // Declare the schema of the config.
        const envConfigSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            APP_PORT: Joi.number().default(8080),
            PRISMA_ENDPOINT: Joi.string().required(),
            PRISMA_MANAGEMENT_API_SECRET: Joi.string().required(),
            JWT_SECRET: Joi.string().required(),
            FRONTEND_URL: Joi.string()
                .default('http://localhost:3000')
                .required(),
            COOKIE_EXPIRY_TIME: Joi.string()
                .default('1d')
                .required()
        });

        // Validate the schema.
        const { error, value: validatedEnvConfig } = envConfigSchema.validate(
            envConfig
        );

        // Report errors.
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        // Return Schema.
        return validatedEnvConfig;
    }

    /**
     * Retrieve a value from the configuration
     *
     * @param {string} key
     * @returns {string}
     * @memberof ConfigService
     */
    get(key: string): string {
        return this.envConfig[key];
    }
}
