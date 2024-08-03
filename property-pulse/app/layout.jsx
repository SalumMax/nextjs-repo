import '@/assets/styles/globals.css'
import Navbar from './components/Navabr';
import Footer from './components/Footer';



export const metadata = {
    title: 'Property Pulse',
    description: 'Find your next short stay property',
    keywords: 'property, short stay, rental, accommodation',
}

const MainLayout = ({children}) => {
    return ( 
    <html>
        <body>
        <Navbar />
            <main> 
                {children}            
            </main>
        <Footer />
        </body>
    </html>
    )
}
 
export default MainLayout;