'use client'

import React from "react";

import { Nav as NavType } from "@/payload-types";

import {CMSLink} from "@/_components/Link"
import { Gutter } from "@/_components/Gutter";

import classes from "./index.module.scss"
import Link from "next/link";
import Logo from "../Logo";

const NavBar: React.FC<{ nav: NavType }> = ({nav}) => {

  const navItems = nav?.items || []

  return !navItems ? null : (
    <nav className={classes.nav}>
      <Gutter>
        <div className={classes.wrap}>
          <Link href="/">
            <Logo className={classes.logo} />
          </Link>
          <div className={classes.navItems}>
            {navItems.map(({link, items}, key) => {
              return (
                <div key={key} className={classes.navItem}>
                  <CMSLink key={key} {...link} />

                  { items.length > 0 &&
                    <div className={classes.subNavItems}>
                      {items?.map(({link}, key) => {
                        return (
                          <div className={classes.navItem}>
                            <CMSLink key={key} {...link} />
                          </div>
                        )
                      })}
                    </div>
                  }

                </div>
              )
            })}
          </div>
        </div>
      </Gutter>
    </nav>
  )
}

export default NavBar
