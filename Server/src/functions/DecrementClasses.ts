import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Connection, Request as SqlRequest, ConnectionConfiguration } from "tedious";

const config: ConnectionConfiguration = {
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
        rowCollectionOnRequestCompletion: true
    }
};

export async function decrementClasses(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    const { id } = request.params;

    return new Promise((resolve) => {
        const connection = new Connection(config);

        connection.on("connect", (err) => {
            if (err) {
                context.error("Connection failed: ", err);
                resolve({
                    status: 500,
                    jsonBody: { error: "Failed to connect to database" }
                });
                return;
            }

            const checkQuery = `SELECT SessionsLeft FROM Student WHERE StudentID = ${id}`;
            const checkRequest = new SqlRequest(checkQuery, (err, rowCount, rows) => {
                if (err) {
                    context.error("Request failed: ", err);
                    resolve({
                        status: 500,
                        jsonBody: { error: "Failed to retrieve data" }
                    });
                    connection.close();
                    return;
                }

                if (rowCount === 0) {
                    resolve({
                        status: 404,
                        jsonBody: { error: "Student not found" }
                    });
                    connection.close();
                    return;
                }

                const numClasses = rows[0][0].value;
                if (numClasses > 0 && numClasses !== null) {
                    const updateQuery = `UPDATE Student SET SessionsLeft = SessionsLeft - 1 WHERE StudentID = ${id}`;
                    const updateRequest = new SqlRequest(updateQuery, (err) => {
                        if (err) {
                            context.error("Request failed: ", err);
                            resolve({
                                status: 500,
                                jsonBody: { error: "Failed to update data" }
                            });
                            connection.close();
                            return;
                        }

                        resolve({
                            status: 200,
                            jsonBody: { message: "numClasses decremented successfully" }
                        });
                        connection.close();
                    });

                    connection.execSql(updateRequest);
                } else {
                    resolve({
                        status: 400,
                        jsonBody: { error: "numClasses is already 0" }
                    });
                    connection.close();
                }
            });

            connection.execSql(checkRequest);
        });

        connection.connect();
    });
}
