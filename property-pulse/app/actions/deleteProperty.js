"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(property_id) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(property_id);

  if (!property) throw new Error("Property not found");

  // Verify ownership
  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorised");
  }

  //Extract public ID from the image URLs
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/"); //splits the url by slashes
    return parts.at(-1).split(".").at(0); //takes the last part, then splits it by "." and take first
  });

  //Delete images from Cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy(`property-flow/${publicId}`);
    }
  }
  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
