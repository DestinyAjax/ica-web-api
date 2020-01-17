export const config  = {
    app: {
        port: process.env.PORT as string,
        name : "Test",
        email : "adedotunolawale@gmail.com",
        JWT_SECRET: process.env.JWT_SECRET as string,
    },
    user: process.env.user as any,
    db: {
        url: process.env.CLEARDB_DATABASE_URL as string,
    },
    data: {
        limit: "50mb",
        extended: false,
    },
    mail: {
        auth: {
            api_user: process.env.SENDGRID_USERNAME as string,
            api_key: process.env.SENDGRID_PASSWORD as string,
        },
    }
};