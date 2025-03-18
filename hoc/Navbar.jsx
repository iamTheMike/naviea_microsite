import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { BG, FAVICON, LOGO } from "@/assets";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function Navbar({ scroll }) {
  const router = useRouter();
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        // backgroundColor: scroll > 0 ? "#fff" : "transparent",
        color: scroll > 0 ? "#000" : "#fff",
        boxShadow: scroll > 0 ? "0px 0px 10px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s ease",
        backgroundImage: `url(${BG.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",

      }}
    >
      <Toolbar>
        <Box className="py-1 w-full flex justify-between items-center">
          <Box className="hidden lg:block">
            <Image
              src={LOGO.src}
              width={256}
              height={265}
              alt="logo"
              className="h-24 w-auto object-contain"
              draggable={false}
            />
          </Box>
          <Box className=" lg:hidden relative flex flex-row py-2">
            <IconButton
              aria-label="open drawer"
              edge="start"
              // onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: scroll > 0 ? "#18529a" : "#18529a",
                opacity:0
              }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src={LOGO.src}
              width={256}
              height={265}
              alt="logo"
              className="h-14 w-auto object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </Box>
          <Box className="h-full flex justify-center items-center">
            <Button
              sx={{
                backgroundColor: "#18529a !important",
                color: "#fff !important",
                py: 1,
                px: 3,
                borderRadius: "50px !important",
                height: "fit-content",
              }}
              size="small"
              onClick={() => {
                Swal.fire({
                  icon: "question",
                  title: "คุณต้องการออกจากระบบใช่หรือไม่",
                  heightAuto: false,
                  showCancelButton: true,
                  confirmButtonText: "ใช่",
                  cancelButtonText: "ไม่ใช่",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("NESTLE_admin");
                    router.push("/sign-in");
                  }
                });
              }}
            >
              Sign out
            </Button>
          </Box>
        </Box>
        {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box> */}
      </Toolbar>
    </AppBar>
  );
}
