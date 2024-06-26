import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { Connection, Request as SqlRequest, ConnectionConfiguration } from "tedious";
import { config } from "../services/config";

export async function studentList(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

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

            const sqlRequest = new SqlRequest(
                "SELECT StudentID, Name FROM Student",
                (err, rowCount, rows) => {
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
                        context.warn("No rows returned from the query.");
                        resolve({
                            status: 404,
                            jsonBody: { error: "No students found" }
                        });
                        connection.close();
                        return;
                    }

                    const students: any[] = [];

                    rows.forEach((row: { value: any; }[]) => {
                        const student = {
                            id: row[0].value,
                            name: row[1].value,
                        };
                        students.push(student);
                    });

                    resolve({
                        status: 200,
                        jsonBody: { students: students }
                    });
                    connection.close();
                }
            );

            connection.execSql(sqlRequest);
        });

        connection.connect();
    });
}
