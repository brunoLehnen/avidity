export interface IConfig {
    port: number;
    prettyLog: boolean;
}

const config = {
    port: process.env.SERVER_PORT,
    prettyLog: process.env.NODE_ENV == 'development',
};

export { config };
