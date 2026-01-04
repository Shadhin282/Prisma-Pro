import app from "./app";
import { prisma } from "./lib/prisma";


const port = 5000;

const run = async () => {
    
    try {
        await prisma.$connect()
      app.get('/', (req, res) => {
        console.log("hello world!")
    })
    app.listen(port, () => {
        console.log("server is running on ", port)
    })

    } catch (error) {
    
    }
}
run();