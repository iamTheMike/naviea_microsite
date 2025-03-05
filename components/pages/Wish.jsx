import { BTN_BACK, BTN_CONTINUE, LOGO, WISH, WISH_TEXT, TITLE } from "@/assets";
import { textData } from "@/utils/textData";
import { Box, Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import {
  BG_FRAME,
  FRAME,
  LOGO2,
  PRODUCT,
  TEXT_BOT,
  TEXT_FRAME,
} from "../../assets";
import { Title } from "@mui/icons-material";

export default function Wish({ handleChange, user, nextPage, prevPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const textSplit = user.wish.split(" ").join("");

    const data = textData.filter((item) =>
      textSplit.toUpperCase().includes(item.text.toUpperCase())
    );
    console.log("BadWord", data);
    if (data.length > 0)
      return Swal.fire({
        icon: "error",
        title: "ข้อความไม่เหมาะสม",
        text: `คำว่า "${data[0].text}" ไม่สามรถใช้ได้`,
        heightAuto: false,
      });

    nextPage();
  };
  return (
    <Box
      className="flex flex-col  justify-center items-center mt-5 "
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Image
        src={LOGO2.src}
        alt="Nescafe"
        width={150}
        height={150}
        className="object-contain"
      />

      <Box className="flex flex-col items-center justify-center relative   " sx={{}}>
        <Box className="top-[7px] left-2 relative items-center justify-center ">
          <Image
            src={TITLE.src}
            width={380}
            height={380}
            alt="text wish"
            className="  object-contain mt-3 reindeer  "
          />
        </Box>

        <Box
          className="flex flex-col z-50 items-center justify-center gap-3  p-4"
          sx={{
            // backgroundColor: "#ffffffa1 !important",
            borderRadius: "12px !important",
            backgroundImage: `url(${BG_FRAME.src})`, // ใช้ภาพพื้นหลัง
            backgroundSize: "cover", // ให้ภาพขยายเต็มพื้นที่
            backgroundPosition: "center", // วางภาพให้ตรงกลาง
          }}
        >
          <Box
            className="border-[2px] p-3 border-white rounded-[12px]"
            style={{ borderStyle: "dashed" }}
          >
            <TextField
              variant="outlined"
              name="wish"
              value={user.wish}
              onChange={handleChange}
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
                width: "300px",
              }}
              multiline
              rows={6}
              required
              inputProps={{ maxLength: 300 }}
            >
              
            </TextField>
         
          </Box>
              
          <Box className="flex justify-center h-full w-full">
            <Image
              src={TEXT_FRAME.src}
              alt="Nescafe"
              width={250}
              height={250}
              className="object-contain w-30"
            />
          </Box>
        </Box>
      </Box>
      <Typography className="text-end">
            {user.wish.length || 0} / 300
          </Typography >
      <Box className="flex flex-row w-full justify-around py-5  z-50">
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
      <Box className="relative top-[-2rem] flex flex-col justify-center items-center">
        <Image
          src={PRODUCT.src}
          alt="NIVEA"
          width={250}
          height={250}
          className="raindear w-50 object-contain z-[-1] "
        />
        <Image
          src={TEXT_BOT.src}
          alt="NIVEA"
          width={500}
          height={500}
          className="object-contain "
        />
      </Box>
    </Box>
  );
}
