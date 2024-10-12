import logo from "../assets/shrk.png";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 font-quicksand">
      <p className="text-3xl font-extrabold sm:text-5xl text-primary-900">
        nibi
      </p>
      <div className="w-12 h-12 overflow-hidden border-2 rounded-full sm:border-4 sm:w-16 sm:h-16 border-primary-900">
        <img src={logo} alt="logo" className="object-contain w-full" />
      </div>
    </nav>
  );
}
