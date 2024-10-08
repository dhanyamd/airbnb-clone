'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "./Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"
import useRegisterModal from "../hooks/UseRegister"
import useLoginModal from "../hooks/UseLogin"
import { signOut } from "next-auth/react"
import { SafeUser } from "../types"
import useRentModal from "../hooks/UseRentModal"
import { useRouter } from "next/navigation"

interface UserMenuProps{
    currentUser? : SafeUser | null;
}

const UserMenu : React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const[isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal()
    const LoginModal = useLoginModal();
    const rentModal = useRentModal();
    const router = useRouter()

    const toggleOpen = useCallback(()=> {
       setIsOpen((value) => !value)
    },[isOpen])

    const onRent = useCallback(()=> {
     if(!currentUser){
       return LoginModal.onOpen()
     }
     // we need to open rent modal if logged in
     rentModal.onOpen();
      
    },[currentUser, LoginModal, rentModal])

    return (
        <div 
        className="relative">
            <div className="flex flex-row items-center gap-3">
                <div onClick={onRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 hover:bg-neutral-100 rounded-full transition cursor-pointer">
                   Rentalio your home 
                </div>
                <div onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 cursor-pointer border-[1px] flex flex-row items-center gap-3 hover:shadow-md transition border-neutral-100 rounded-full"
                    >
                     <AiOutlineMenu />
                     <div className="hidden md:block">
                      <Avatar src={currentUser?.image}/>   
                     </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute shadow-md rounded-xl w-[40vw] md:w-3/4 overflow-hidden right-0 top-12 text-sm bg-white">
                     <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                                <MenuItem onClick={() => router.push('/trips')}
                                    label="My trips" />
                            
                                    <MenuItem onClick={()=> router.push('/favourites')}
                                        label="My favourites" />

                                        
                                    <MenuItem onClick={()=> router.push('/reservation')}
                                        label="My reservations" />
                                        
                                    <MenuItem onClick={()=> router.push('/properties')}
                                        label="My properties" />
                                        
                                    <MenuItem onClick={rentModal.onOpen}
                                        label="Airbnb my home" />
                                        <hr/>
                                        
                                    <MenuItem onClick={()=> signOut()}
                                        label="Logout" />
                                </>

                        ): (
        
                          <>
                                    <MenuItem onClick={LoginModal.onOpen}
                                        label="Login" />
                                
                                        <MenuItem onClick={registerModal.onOpen}
                                            label="Signup" />
                                    </>
                        )}
                    
                     </div>
                    </div>
            )}                  

        </div>
    )
}

export default UserMenu