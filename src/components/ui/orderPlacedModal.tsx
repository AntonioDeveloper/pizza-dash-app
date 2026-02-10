'use client'
import { useOrders } from "@/context/context"
import ModalComponent from "./modalComponent"
import {useState} from "react";

export default function OrderPlacedModal() {
  const {currentClient, cartItems} = useOrders();
  const [isOpen, setIsOpen] = useState(false);

  console.log("currentClient", currentClient, "cartItems", cartItems);

  return(
   <ModalComponent open={isOpen} onClose={() => {setIsOpen(false)}}>
    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Pedido Realizado!</h1>    
   </ModalComponent>
  )
}