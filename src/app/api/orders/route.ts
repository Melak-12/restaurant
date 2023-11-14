// "use client";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { title, desc } = await request.json();
//   await dbConnect();
//   await Product.create({ title, desc });
//   return NextResponse.json({ message: "produc created!" }, { status: 201 });
// }

// import { Component } from "react";

// class MyComponent extends Component {
//   async POST(request: Request) {
//     const { title, desc } = await request.json();
//     // await clientPromise();
//     await Product.create({ title, desc });
//     return NextResponse.json({ message: "product created!" }, { status: 201 });
//   }
//   render() {
//     return "";
//   }
// }

// export default MyComponent;
export async function GET(req: NextRequest,res:NextResponse) {
  if (!req) {
    return new NextResponse(
      JSON.stringify({ name: "Please provide something to search for" }),
      { status: 400 }
    );
  }
  
  return new NextResponse(JSON.stringify({ answer: "John Doe" }), {
    status: 200,
  });
}

export async function POST(req: NextRequest,res:NextResponse) {
  // const { nameLookup }: MyData = await req.json();

  if (!req) {
    return new NextResponse(
      JSON.stringify({ name: "Please provide something to search for" }),
      { status: 400 }
    );
  }
  const data=req.json();
  return new NextResponse(JSON.stringify({ answer:data }), {
    status: 200,
  });
}