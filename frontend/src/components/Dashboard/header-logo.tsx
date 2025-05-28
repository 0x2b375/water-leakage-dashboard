import { Link } from "react-router";

export function HeaderLogo() {
  return (
    <Link to="/">
      <div className="items-center hidden lg:flex">
        <img src="logo.svg" alt="Logo" height={30} width={30} />
        <p className="font-semibold text-white text-2xl ml-2.5">Water Leakage</p>
      </div>
    </Link>
  );
}
