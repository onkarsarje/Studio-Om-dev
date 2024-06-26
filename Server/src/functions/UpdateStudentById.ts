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

type Student = {
    name: string;
    email: string;
    phone: string;
    passType: string;
    startDate: string | null;
    endDate: string | null;
    numClasses: number | null;
};

export async function updateStudentById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    let studentUpdate: Partial<Student>;

    try {
        studentUpdate = await request.json() as Partial<Student>;
    } catch (error) {
        return {
            status: 400,
            jsonBody: { error: "Invalid request body" }
        };
    }

    const { id } = request.params;
    const { passType, startDate, endDate, numClasses } = studentUpdate;

    const updateFields: string[] = [];
    if (passType) updateFields.push(`PassType = '${passType}'`);
    if (startDate) updateFields.push(`StartDate = '${startDate}'`);
    if (endDate) updateFields.push(`EndDate = '${endDate}'`);
    if (numClasses !== undefined) updateFields.push(`SessionsLeft = ${numClasses}`);

    if (updateFields.length === 0) {
        return {
            status: 400,
            jsonBody: { error: "No fields to update" }
        };
    }

    const updateQuery = `UPDATE Student SET ${updateFields.join(", ")} WHERE StudentID = ${id}`;

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

            const sqlRequest = new SqlRequest(updateQuery, (err) => {
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
                    jsonBody: { message: "Student updated successfully" }
                });
                connection.close();
            });

            connection.execSql(sqlRequest);
        });

        connection.connect();
    });
}
