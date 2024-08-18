"use server";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache"; // updates cache once the form is submitted
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

const editProperty = async (propertyId, formData) => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error(" User ID is required");
  }

  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);
  //Verify ownership

  if (existingProperty.owner.toString() !== userId) {
    throw new Error("Current user is not authorised to edit this property");
  }

  const images = formData.getAll("images");
  let imageUrls = existingProperty.images;

  if (images.length > 0) {
    // Delete old images from Cloudinary
    for (const imgUrl of imageUrls) {
      const publicId = imgUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    // Upload new images to Cloudinary
    imageUrls = [];
    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-flow",
        }
      );

      imageUrls.push(result.secure_url);
    }
  }

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    images: imageUrls,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
};

export default editProperty;
