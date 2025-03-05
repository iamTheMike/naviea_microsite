import { BG, LOGO } from "@/assets";
import httpRequest from "@/utils/httpRequest";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SignIn() {
  const router = useRouter();
  const initAdmin = {
    username: "",
    password: "",
  };
  const [admin, setAdmin] = useState(initAdmin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await httpRequest("post", "/admin/signIn", admin);
    // console.log(res);
    if (res.status == "error")
      return Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        heightAuto: false,
      });
    Swal.fire({
      icon: "success",
      title: "เข้าสู่ระบบสำเร็จ",
      heightAuto: false,
    });
    localStorage.setItem("NESTLE_admin", JSON.stringify(res.token));
    router.push("/dashboard");
  };

  return (<></>
  // <Box sx={{
  //   width: "100%",
  //   height: "100vh",
  //   backgroundImage: `url(${BG.src})`,
  //         backgroundSize: "cover",
  //         backgroundRepeat: "no-repeat",
  //         backgroundPosition: "bottom center",
  // }}>
  //     <Container
  //     maxWidth="sm"
  //     className="h-screen flex flex-col  justify-center items-center"
  //   >
  //     <Image src={LOGO.src} width={512} height={512} alt="logo" className="w-[50%] object-contain"/>
  //     <h1 className="text-4xl font-bold">Sign In</h1>

  //     <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
  //       <Box>
  //         <Typography>Username</Typography>
  //         <TextField
  //           required
  //           fullWidth
  //           id="username"
  //           name="username"
  //           autoComplete="username"
  //           autoFocus
  //           value={admin.username || ""}
  //           onChange={handleChange}
  //         />
  //       </Box>
  //       <Box>
  //         <Typography>Password</Typography>
  //         <TextField
  //           required
  //           fullWidth
  //           id="password"
  //           name="password"
  //           type="password"
  //           value={admin.password || ""}
  //           onChange={handleChange}
  //         />
  //       </Box>
  //       <Button
  //         fullWidth
  //         variant="contained"
  //         sx={{
  //           mt: 3,
  //           mb: 2,
  //           backgroundColor: "#18529a !important",
  //           color: "#fff !important",
  //           py: 2,
  //         }}
  //         type="submit"
  //       >
  //         Sign In
  //       </Button>
  //     </Box>
  //   </Container>
  // </Box>
  );
}
