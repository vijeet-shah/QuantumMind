"use client";

import { Button } from "./ui/button";

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  return (
    <Button size={"sm"} id="navbar-default">
      Login
    </Button>
  );
};
