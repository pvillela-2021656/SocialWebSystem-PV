import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Social Web System API",
            version: "1.0.0",
            description: "API para sistema de publicaciones",
            contact:{
                name: "Pablo Villela",
                email: "pvillela-2021656@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3007/socialNetwork/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/category/category.routes.js",
        "./src/comments/comment.routes.js",
        "./src/publication/publication.routes.js",
        "./src/user/user.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }

