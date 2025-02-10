



const NavBar = () => {
  return (
    <nav className=" flex justify-between bg-[#086c9c] text-white "> 
      <div>
        <h1> Job FInder</h1>
      </div>
      <div className="flex space-x-3 uppercase ">
        <h1>Sign in</h1>
        <h1>/</h1>
        <h1>sign up</h1>
      </div>
    </nav>
  );
}

export default NavBar