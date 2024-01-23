import {PrismaClient} from "@prisma/client"


declare global {
    var prisma:PrismaClient | undefined
}
//No affected by hot reload in Nextjs
const prismadb = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export default prismadb;