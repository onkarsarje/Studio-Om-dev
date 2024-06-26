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

export async function addStudent(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`HTTP function processed request for url "${request.url}"`);

    let student: Student;

    try {
        student = await request.json() as Student;
    } catch (error) {
        return {
            status: 400,
            jsonBody: { error: "Invalid request body" }
        };
    }

    const { name, email, phone, passType, startDate, endDate, numClasses } = student;

    if (!name || !email || !phone || !passType || startDate === undefined || endDate === undefined || numClasses === undefined) {
        return {
            status: 400,
            jsonBody: { error: "All student fields are required" }
        };
    }

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

            const query = `INSERT INTO Student (Name, Email, Phone, PassType, StartDate, EndDate, SessionsLeft) VALUES ('${name}', '${email}', '${phone}', '${passType}', '${startDate}', '${endDate}', ${numClasses})`;

            const sqlRequest = new SqlRequest(query, (err) => {
                if (err) {
                    context.error("Request failed: ", err);
                    resolve({
                        status: 500,
                        jsonBody: { error: "Failed to insert data" }
                    });
                    connection.close();
                    return;
                }

                resolve({
                    status: 200,
                    jsonBody: { message: "Student added successfully" }
                });
                connection.close();
            });

            connection.execSql(sqlRequest);
        });

        connection.connect();
    });
}
