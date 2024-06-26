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

export async function getStudentById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
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

            const query = `SELECT * FROM Student WHERE StudentID = ${id}`;
            const sqlRequest = new SqlRequest(query, (err, rowCount, rows) => {
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

                const student = {
                    name: rows[0][1].value,
                    email: rows[0][2].value,
                    phone: rows[0][3].value,
                    passType: rows[0][4].value,
                    startDate: rows[0][5].value,
                    endDate: rows[0][6].value,
                    numClasses: rows[0][7].value,
                };

                resolve({
                    status: 200,
                    jsonBody: { student: student }
                });
                connection.close();
            });

            connection.execSql(sqlRequest);
        });

        connection.connect();
    });
}
