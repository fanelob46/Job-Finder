import logo from "../assets/logo.jpg"

const NavBar = () => {
  return (
    <nav className=" flex justify-around bg-[#086c9c] text-white  py-3">
      <div>
        <img src={logo} alt="" className="h-20"/>
      </div>
      <div className="flex space-x-3 uppercase pt-7">
        
        <h1>Sign in</h1>
        <h1>/</h1>
        <h1>sign up</h1>
      </div>
    </nav>
  );
};

export default NavBar;
