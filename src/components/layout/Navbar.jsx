"use client"

import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Bell, ChevronDown, Menu, Package, LogOut } from "lucide-react";
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

import { usePathname } from "next/navigation";


const categories = [
  { name: "Electronics", url: "/category/electronics" },
  { name: "Fashion", url: "/category/fashion" },
  { name: "Home & Living", url: "/category/home-living" },
  { name: "Health & Beauty", url: "/category/health-beauty" },
  { name: "Baby & Toys", url: "/category/baby-toys" },
  { name: "Groceries", url: "/category/groceries" },
  { name: "Sports & Outdoors", url: "/category/sports-outdoors" },
  { name: "Automotive", url: "/category/automotive" },
];

export default function Navbar() {

  const { data: session } = useSession();
  // Handler for logout
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (


  const pathName=usePathname();

  if(!pathName.includes("dashboard")){ 
     return (

    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Main navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden cursor-pointer">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader className="sticky top-0 border-b z-50">
                <SheetTitle className="text-2xl text-orange-500">ShopSphere</SheetTitle>
                <SheetDescription>
                  A Multi-vendor E-commerce Site
                </SheetDescription>
              </SheetHeader>
              <div className="px-4 overflow-y-auto">
                <h3 className="text-sm font-medium mb-3 uppercase">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.url}
                      className="block py-2 px-4 hover:bg-orange-50 hover:text-orange-500 rounded-md"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Separator className="my-2" />
                <h3 className="text-sm font-medium my-3 uppercase">HELP & SETTINGS</h3>
                <div className="space-y-2">
                  <Link
                    href="/help-center"
                    className="block py-2 px-4 hover:bg-orange-50 hover:text-orange-500 rounded-md"
                  >
                    Help Center
                  </Link>
                  <Link
                    href="/sell"
                    className="block py-2 px-4 hover:bg-orange-50 hover:text-orange-500 rounded-md"
                  >
                    Sell on ShopSphere
                  </Link>
                  <Link
                    href="/contact"
                    className="block py-2 px-4 hover:bg-orange-50 hover:text-orange-500 rounded-md"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <SheetFooter className="sticky bottom-0 border-t z-50">
                <SheetClose asChild>
                  {session ? (
                    <Button
                      variant="destructive"
                      className={"cursor-pointer"}
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>) : (
                    <Button asChild className="bg-orange-500 hover:bg-orange-600">
                      <Link href="/login">Login</Link>
                    </Button>
                  )}
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="font-bold text-2xl text-orange-500">ShopSphere</div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 hidden md:flex">
            <div className="relative w-full max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder="Search in ShopeSphere"
              />
              <Button
                className="absolute right-0 top-0 bottom-0 bg-orange-500 hover:bg-orange-600 rounded-l-none"
              >
                <Search size={18} />
              </Button>
            </div>
          </div>

          {/* Navigation icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Cart */}
            <Link href="/cart" className="flex flex-col items-center p-1 text-gray-700 hover:text-orange-500">
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="text-xs hidden md:inline-block">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="flex flex-col items-center p-1 text-gray-700 hover:text-orange-500">
              <Heart size={24} />
              <span className="text-xs hidden md:inline-block">Wishlist</span>
            </Link>

            {/* Notifications */}
            {session && (
              <Link href="/notifications" className="flex flex-col items-center p-1 text-gray-700 hover:text-orange-500  sm:flex">
                <div className="relative">
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    2
                  </span>
                </div>
                <span className="text-xs hidden md:inline-block">Notifications</span>
              </Link>)}

            {/* User dropdown */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex flex-col items-center p-1 h-auto">
                    <User size={24} />
                    <span className="text-xs items-center hidden md:flex">
                      {session && session.user.name} <ChevronDown size={12} className="ml-1" />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Welcome, {session.user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href="/account/profile" className="w-full">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account/orders" className="w-full">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account/returns" className="w-full">My Returns</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account/cancellations" className="w-full">My Cancellations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account/reviews" className="w-full">My Reviews</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/account/vouchers" className="w-full">My Vouchers</Link>
                  </DropdownMenuItem>
                  {session.user.role === 'user' && (
                    <DropdownMenuItem asChild className={"cursor-pointer"}>
                      <Link href="/dashboard/user">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user.role === 'vendor' && (
                    <DropdownMenuItem asChild className={"cursor-pointer"}>
                      <Link href="/dashboard/vendor" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Seller Center</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {session.user.role === 'admin' && (
                    <DropdownMenuItem asChild className={"cursor-pointer"}>
                      <Link href="/dashboard/admin" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <Button
                    variant="destructive"
                    size={"sm"}
                    className={"w-full cursor-pointer"}
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>

                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-orange-500 hover:bg-orange-600">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search in ShopSphere"
            />
            <Button
              className="absolute right-0 top-0 bottom-0 bg-orange-500 hover:bg-orange-600 rounded-l-none py-1"
              size="sm"
            >
              <Search size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories navbar */}
      <div className="border-t border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 overflow-x-auto py-2 text-sm">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.url}
                className="whitespace-nowrap hover:text-orange-500"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );}

};