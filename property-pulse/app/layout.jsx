import '@/assets/styles/globals.css'


export const metadata = {
    title: 'Property Pulse',
    description: 'Find your next short stay property',
    keywords: 'property, short stay, rental, accommodation',
}

const MainLayout = ({children}) => {
    return ( 
    <html>
        <body>
            <main> 
                {children}            
            </main>
        </body>
    </html>
    )
}
 
export default MainLayout;