'use client'

import React from "react";

import { Nav as NavType } from "@/payload-types";

import {CMSLink} from "@/_components/Link"
import { Gutter } from "@/_components/Gutter";

import classes from "./index.module.scss"

const NavBar: React.FC<{ nav: NavType }> = ({nav}) => {

  const navItems = nav?.items || []

  return !navItems ? null : (
    <nav className={classes.nav}>
      <Gutter>
        <div className={classes.wrap}>
          {navItems.map(({link}, key) => {
            return <CMSLink key={key} {...link} />
          })}
        </div>
      </Gutter>
    </nav>
  )
}

export default NavBar