import PropertyCard from "./PropertyCard";
import properties from "@/properties.json";
import Link from "next/link";

const HomeProperties = () => {
    return ( 
        <>
             <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Properties</h2>
                {properties.length === 0 ? <p>No properties found</p>: (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                    {
                        properties.slice(0, 3).map(property => (
                            <PropertyCard key={property._id} property={property} />  
                        ))
                    }</div>
                )}
            </div>

        </section>

        <section className="m-auto max-w-lg my-6 px-6" >
            <Link href="/properties" className="bg-black hover:bg-gray-600 text-white py-4 px-6 rounded-xl text-center block"> 
            View All Properties
            </Link> 
            
        </section>
        </>

       
    );
}
 
export default HomeProperties;