"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

interface mobileSidebarProps {
    apiLimitCount : number,
    isPro : boolean
}

const MobileSidebar = ({
    apiLimitCount = 0,
    isPro = false
}: mobileSidebarProps) =>{

const [isMountend,setIsMounted] = useState(false)

useEffect(()=>{
setIsMounted(true)
},[])

if(!isMountend){
    return null
}

    return(<Sheet>
        <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
            <Menu/>
        </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
            <Sidebar isPro={isPro} apiLimitCount={apiLimitCount}/>
            </SheetContent>
       
    </Sheet>)
}

export default MobileSidebar;