import Link from "next/link";
import Infobox from "./Infobox";
const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Infobox heading="For Renters" buttonInfo = {{
            href: "/properties",
            text: "Browse Properties",
            backgroundColor: "bg-black",
          }}>
            Find your dream rental property. Bookmark properties and contact
            owners.
          </Infobox>
          <Infobox heading="For Property Owners" backgroundColor="bg-blue-100" buttonInfo ={{
            href: "/properties/add",
            text: "List your property",
            backgroundColor: "bg-blue-500",
          }}>
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </Infobox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
