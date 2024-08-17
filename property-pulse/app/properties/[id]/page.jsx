import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import PropertyDetails from "@/app/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/app/components/PropertyImages";
import { toSerialisableObj } from "@/utils/convertToObj";

const PropertyPage = async ({ params }) => {
  await connectDB();

  const propertyDoc = await Property.findById(params.id).lean();
  const property = toSerialisableObj(propertyDoc);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className=" mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section class="bg-blue-50">
        <div class="container m-auto py-10 px-6">
          <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6"></div>
          {/* Property Details */}
          <PropertyDetails property={property} />
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
