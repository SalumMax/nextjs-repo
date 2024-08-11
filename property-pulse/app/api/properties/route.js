import connectDB from "@/config/database";
import Property from "@/models/Property"

//this is just for testing purposes. Won't be used in prod 

export const GET = async () => {
   await connectDB();

   try {

    const properties = await Property.find({})
    return new Response(properties, {status: 200})
    
   } catch (error) {
    return new Response ("Something went wrong", {status: 500})
   }
}