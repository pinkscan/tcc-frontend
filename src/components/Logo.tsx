import logo from "../assets/logo-pinkscan.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-0">
      <img src={logo} alt="PinkScan Logo" className="w-16 h-16" />
      <div className="flex flex-col leading-tight">
        <span className="text-pinkscan-dark text-xl font-bold">Pink</span>
        <span className="text-pinkscan-dark text-xl">Scan</span>
      </div>
    </div>
  );
}
