'use client'
import Container from "./Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from "../types"
import Categories from "./Categories"
import { Suspense } from "react"

interface NavbarProps{
  currentUser? : SafeUser | null
}

const NavBar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  console.log({currentUser})
 return (
    <div className="fixed w-full bg-white shadow-sm z-10"> 
    <div className="py-4 border-b-[1px]">
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo/>
            <Suspense>
            <Search/>
            </Suspense>
            <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
    </div>
    <Suspense>
        <Categories/>
        </Suspense>
     </div>
 )

}

export default NavBar