import Sidebar from "../components/Sidebar";

function HomePage({ collapsed }) {
    return (
        <div className="flex h-full">
            <Sidebar collapsed={collapsed} />
            <main className="bg-slate-200 h-full w-full p-10">Home Page</main>
        </div>
    );
}

export default HomePage;
