'use client'

import React from "react";

import { Page as PageType, Nav as NavType } from "@/payload-types";
import Link from "next/link";

import classes from "./index.module.css"

const NavBar: React.FC<{ nav: NavType }> = ({nav}) => {

  const navItems = nav?.items || []

  return !navItems ? null : (
    <nav className={classes.nav}>
      {navItems.map((item, key) => {
        const pageDetails = item.page as PageType
        return (
          <Link key={key} href={`/${pageDetails.slug}`}>{pageDetails.title}</Link>
        )
      })}
    </nav>
  )
}

export default NavBar