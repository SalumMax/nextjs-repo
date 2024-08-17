import Image from 'next/image';
import connectDB from '@/config/database';
import Property from  "@/models/Property";
import { getSessionUser } from '@/utils/getSessionUser';
import profileDefault from '@/assets/images/profile.png'
import UserProfileProperties from '../components/UserProfileProperties';
import { toSerialisableObj } from '@/utils/convertToObj';

const ProfilePage = async  () => {

    await connectDB()
    const  sessionUser = await getSessionUser()
    const { userId} = sessionUser;

    if(!userId){
        throw new Error ('User ID is required.')
    }

    const propertiesDocuments = await Property.find({owner: userId}).lean()
    const properties = propertiesDocuments.map(toSerialisableObj)

    console.log(properties)

    return ( <div><section class="bg-blue-50">
        <div class="container m-auto py-24">
          <div
            class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
          >
            <h1 class="text-3xl font-bold mb-4">Your Profile</h1>
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/4 mx-20 mt-10">
                <div class="mb-4">
                  <Image
                    class="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={ sessionUser.user.image || profileDefault }
                    alt="User"
                    width={54}
                    height={54}
                  />
                </div>
  
                <h2 class="text-2xl mb-4">
                  <span class="font-bold block">Name: </span> {sessionUser.user.name}
                </h2>
                <h2 class="text-2xl">
                  <span class="font-bold block">Email: </span> {sessionUser.user.email}
                </h2>
              </div>
  
              <div class="md:w-3/4 md:pl-4">
                <h2 class="text-xl font-semibold mb-4">Your Listings</h2>
               <UserProfileProperties properties = {properties}/>
              </div>
            </div>
          </div>
        </div>
      </section> </div> );
}
 
export default ProfilePage;