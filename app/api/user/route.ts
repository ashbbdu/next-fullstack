import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const client = new PrismaClient()
export function GET() {
    return Response.json({ username: "harkirat", email: "harkirat@gmail.com" })
}


export async function POST(req: NextRequest) {
    // console.log(req.json() , "body");  //req.json is used to get the body in next js

    // const body = await req.nextUrl.searchParams;
    // const search = body.get("search")
    // const page = body.get("page")
    // console.log(search , page , "val");

    const body = await req.json()
    console.log(body, "body");

    if (!body.username || !body.password) {
        return Response.json({
            success: false,
            msg: "please fill all the deatils"
        })
    }

    const existingUser = await await client.user.findUnique({
        where : {
            username : body.username
        }
    })

    if(existingUser) {
        return Response.json({
            success: false,
            msg: "User is alreay registered"
        })
    }

    const user = await client.user.create({
        data: {
            username: body.username,
            password: body.password

        }
    })

    return Response.json({ success: true, msg: "User created successfully !", user })
}