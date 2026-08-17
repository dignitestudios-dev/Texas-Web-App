import Footer from "./_components/ui/footer"
import Navbar from "./_components/ui/navbar"


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-[#FFF6F0]">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout