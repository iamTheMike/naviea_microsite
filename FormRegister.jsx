import { BTN_BACK, BTN_CONTINUE, LOGO, TEXT_FILLFORM } from "@/assets";
import httpRequest from "@/utils/httpRequest";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";

export default function FormRegister({
  handleChange,
  user,
  nextPage,
  handleValidatePhoneNumber,
  handleValidateEmail,
  prevPage,
}) {
  // const getByPhone = async () => {
  //   const res = await httpRequest("get", `/user/${user?.phone}`);
  //   console.log(res);
  //   if (res.status == "error") return false;
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // เช็คว่าเบอร์โทรศัพท์นี้มีผู้ใช้งานแล้วหรือยัง
    // const res = await httpRequest("get", `/user/${user?.phone}`);
    // if (res.status == "ok") {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "เบอร์โทรศัพท์นี้มีผู้ใช้งานแล้ว",
    //     heightAuto: false,
    //   });
    // }

    // // เช็คว่าอีเมลนี้มีผู้ใช้งานแล้วหรือยัง
    // let emailform = {
    //   email: user?.email,
    // };
    // const res2 = await httpRequest("post", "/user/email", emailform);
    // if (res2.status == "ok") {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "อีเมลนี้มีผู้ใช้งานแล้ว",
    //     heightAuto: false,
    //   });
    // }

    // เช็คว่าความถูกต้องของเบอร์โทรศัพท์และอีเมล
    if (!handleValidatePhoneNumber()) {
      return Swal.fire({
        icon: "error",
        title: "เบอร์โทรศัพท์ไม่ถูกต้อง",
        heightAuto: false,
      });
    }
    if (!handleValidateEmail()) {
      return Swal.fire({
        icon: "error",
        title: "อีเมลไม่ถูกต้อง",
        heightAuto: false,
      });
    }

    nextPage();
  };
  return (
    <Box
      className="flex flex-col gap-5 justify-center items-center "
      component={"form"}
      onSubmit={handleSubmit}
    >
      
      <Box
        className="flex flex-col gap-5 relative py-20 px-5 mt-14 sm:mt-32  w-full"
        sx={{
          backgroundColor: "#ffffffa1 !important",
          borderRadius: "12px !important",
        }}
      >
      
        <Image
          src={LOGO.src}
          alt="Nescafe"
          width={500}
          height={500}
          className="object-contain h-40 w-auto absolute top-[-5rem] left-[50%] translate-x-[-50%] "
        />

        <Box>
          <TextField
            variant="outlined"
            name="firstName"
            value={user?.firstName || ""}
            onChange={handleChange}
            placeholder="ชื่อ"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff !important",
                  py: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff !important",
                },
                borderRadius: "12px !important",
                fontSize: "1.4rem !important",
                py: 0,
              },
              backgroundColor: "#fff !important",
              borderRadius: "12px !important",
              "& .MuiInputBase-input": {
                py: 1.3,
                color: "#18529a !important",
              },
            }}
            required
          />
        </Box>

        <Box>
          <TextField
            variant="outlined"
            name="lastName"
            value={user?.lastName || ""}
            onChange={handleChange}
            fullWidth
            placeholder="นามสกุล"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff !important",
                  py: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff !important",
                },
                borderRadius: "12px !important",
                fontSize: "1.4rem !important",
                py: 0,
              },
              backgroundColor: "#fff !important",
              borderRadius: "12px !important",
              "& .MuiInputBase-input": {
                py: 1.3,
                color: "#18529a !important",
              },
            }}
            required
          />
        </Box>

        <Box>
          <TextField
            variant="outlined"
            name="nickName"
            value={user?.nickName || ""}
            onChange={handleChange}
            fullWidth
            placeholder="ชื่อเล่น"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff !important",
                  py: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff !important",
                },
                borderRadius: "12px !important",
                fontSize: "1.4rem !important",
                py: 0,
              },
              backgroundColor: "#fff !important",
              borderRadius: "12px !important",
              "& .MuiInputBase-input": {
                py: 1.3,
                color: "#18529a !important",
              },
            }}
            required
          />
        </Box>

        <Box>
          <TextField
            id="email"
            variant="outlined"
            name="email"
            value={user?.email || ""}
            onChange={handleChange}
            fullWidth
            placeholder="อีเมล"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff !important",
                  py: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff !important",
                },
                borderRadius: "12px !important",
                fontSize: "1.4rem !important",
                py: 0,
              },
              backgroundColor: "#fff !important",
              borderRadius: "12px !important",
              "& .MuiInputBase-input": {
                py: 1.3,
                color: "#18529a !important",
              },
            }}
            type="email"
            required
          />
        </Box>

        <Box>
          <TextField
            variant="outlined"
            name="phone"
            value={user?.phone || ""}
            onChange={handleChange}
            fullWidth
            placeholder="เบอร์โทร"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#fff !important",
                  py: 0,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#fff !important",
                },
                borderRadius: "12px !important",
                fontSize: "1.4rem !important",
                py: 0,
              },
              backgroundColor: "#fff !important",
              borderRadius: "12px !important",
              "& .MuiInputBase-input": {
                py: 1.3,
                color: "#18529a !important",
              },
            }}
            type="tel"
            inputProps={{
              maxLength: 10,
            }}
            required
          />
        </Box>

        <Image
          src={TEXT_FILLFORM.src}
          width={256}
          height={256}
          alt="text"
          className="w-[80%] m-auto object-contain"
        />
      </Box>

      <Box className="flex flex-row w-full justify-around">
        <Button
          sx={{
            padding: "0 !important",
          }}
          onClick={prevPage}
        >
          <Image
            src={BTN_BACK.src}
            alt="Nescafe"
            width={256}
            height={256}
            className="object-contain w-36"
          />
        </Button>
        <Button
          sx={{
            padding: "0 !important",
          }}
          type="submit"
        >
          <Image
            src={BTN_CONTINUE.src}
            alt="Nescafe"
            width={256}
            height={256}
            className="object-contain w-36"
          />
        </Button>
      </Box>
      
    </Box>
  );
}
