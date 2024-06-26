import { ConnectionConfiguration } from "tedious";

// Configuration for SQL authentication
export const config: ConnectionConfiguration = {
    server: "studioom.database.windows.net",
    authentication: {
        type: "default",
        options: {
            userName: "sqladmin",
            password: "StudioOM@123"
        }
    },
    options: {
        database: "StudioOM",
        encrypt: true,
        rowCollectionOnRequestCompletion : true
    }
};