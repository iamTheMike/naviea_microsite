import {
  BALLOON_BLUE,
  BALLOON_RED,
  BALLOON_RED_2,
  BG,
  BTN_START,
  LOGO,
  REINDEER,
  TEXT_END,
} from "@/assets";
import FormRegister from "@/components/pages/FormRegister";

import Wish from "@/components/pages/Wish";
import WishResult from "@/components/pages/WishResult";
import { usePubnubContext } from "@/contexts/pubnubContext";
import httpRequest from "@/utils/httpRequest";
import {
  Box,
  Button,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { Cloud, Html, Sky, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Swal from "sweetalert2";
import { FLOWER01, FLOWER02, FLOWER03, FLOWER04, FLOWER05, FLOWER06, FLOWER07, FLOWER08, FLOWER09, FLOWER10, TEXT_THANK, TITLE } from "../assets";
import { Margin } from "@mui/icons-material";
import * as THREE from "three";
import { Plane } from "@react-three/drei";



const LeafEffect = () => {
  const leaves = useRef();
  const count = 20; // จำนวนใบไม้ในฉาก
  const speed = 0.01;

  // โหลดรูปทั้งหมด
  const textures = useLoader(THREE.TextureLoader, [
    FLOWER01.src,
    FLOWER02.src,
    FLOWER03.src,
    FLOWER04.src,
    FLOWER05.src,
    FLOWER06.src,
    FLOWER07.src,
    FLOWER08.src,
    FLOWER09.src,
    FLOWER10.src,
  ]);

  const leafData = useMemo(() => {
    return new Array(count).fill().map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 10, // X: กระจายซ้าย-ขวา
        Math.random() * 5 + 5, // Y: เริ่มต้นจากด้านบนแบบกระจาย
        (Math.random() - 0.5) * 5 // Z: กระจายลึก-ตื้น
      ),
      speed: speed + Math.random() * 0.005, // ความเร็วร่วงแบบสุ่ม
      size: Math.random() * 0.2 + 0.2, // ขนาดใบไม้
      rotation: Math.random() * Math.PI, // หมุนแบบสุ่ม
      sway: (Math.random() - 0.5) * 0.02, // โยกไปมาเบาๆ
      spawnDelay: Math.random() * 5, // ดีเลย์การเกิดของแต่ละใบไม้ (สุ่ม 0-5 วิ)
      texture: textures[Math.floor(Math.random() * textures.length)], // สุ่มเลือกรูป
    }));
  }, [textures]);

  useFrame(({ clock }) => {
    leaves.current.children.forEach((leaf, i) => {
      if (clock.getElapsedTime() < leafData[i].spawnDelay) return; // ให้ใบไม้เริ่มร่วงแบบมีดีเลย์

      leaf.position.y -= leafData[i].speed; // ร่วงลงมาเรื่อยๆ
      leaf.rotation.z += leafData[i].sway; // หมุนเอียงไปมา

      if (leaf.position.y < -5) {
        // รีเซ็ตตำแหน่งเมื่อถึงพื้น
        leaf.position.y = Math.random() * 5 + 5;
        leaf.position.x = (Math.random() - 0.5) * 10;
        leaf.position.z = (Math.random() - 0.5) * 5;
        leafData[i].spawnDelay = Math.random() * 5;
        leafData[i].texture = textures[Math.floor(Math.random() * textures.length)]; // เปลี่ยน Texture ใหม่
      }
    });
  });

  return (
    <group ref={leaves}>
      {leafData.map((leaf, index) => (
        <Plane
          key={index}
          args={[leaf.size, leaf.size]}
          position={leaf.position}
          rotation={[0, 0, leaf.rotation]}
        >
          <meshStandardMaterial
            map={leaf.texture} // ใช้ Texture ที่สุ่มมา
            transparent={true}
            alphaTest={0.5}
          />
        </Plane>
      ))}
    </group>
  );
};

export default function Home() {
  const { pubnub } = usePubnubContext();
  const initUser = {
    firstName: "",
    lastName: "",
    email: "",
    nickName: "",
    phone: "",
    wish: "",
    photo: null,
    photoIg: null,
    photoFile: null,
    photoFileIg: null,
    sharePhotoIg: null,
  };

  const [page, setPage] = useState(0);
  const [user, setUser] = useState(initUser);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
    if (page === 1) {
      setUser(initUser);
    }
  };

  const resetData = () => {
    setPage(0);
    setUser(initUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "phone") {
      if (value.length > 10 && isNaN(value)) return;
    }
    if (name == "wish") {
      if (value.length > 300) return;
    }

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(user);
  };

  const handleSubmitData = async () => {
    let data = user;
    // if (data.photoFile && !data.sharePhotoIg) {
    //   data.photo = await handleUpload(data.photoFile);
    // }
    if (data.photoFileIg && !data.sharePhotoIg) {
      data.sharePhotoIg = await handleUpload(data.photoFileIg);
    }
    const submitData = {
      message: data?.wish,
      imageUrl: data?.sharePhotoIg,
    };
    console.log(submitData);
    const res = await httpRequest("post", "/messages", submitData);
    if (res.status == "error") {
      return Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        heightAuto: false,
      });
    }

    // pubnub.publish({
    //   channel: "nestle",
    //   message: {
    //     ...data,
    //   },
    // });
    console.log("respond", res);
    setUser(data);
    console.log("SubmitData", submitData);
    nextPage();
  };

  const handleUpload = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    const res = await httpRequest("post", "/image/upload", formData, {
      "Content-Type": "multipart/form-data",
    });
    console.log(res);
    if (res.status == "error") {
      return Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        heightAuto: false,
      });
    }

    return res.url;
  };

  const hadleShareIg = async () => {
    const filesArray = [user?.photoFileIg];

    const shareData = {
      files: filesArray,
    };
    //share Url
    // const url = user?.sharePhotoIg;
    // console.log("url", url);
    // const shareData = {
    //   title: "Check out this image!",
    //   text: "I found this awesome image.",
    //   url: url,
    // };
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator
        .share(shareData)
        .then(() => console.log("Share was successful."));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  };

  const handleShare = async () => {
    const filesArray = [user?.photoFile];

    const shareData = {
      files: filesArray,
      // title: "NestlePurelifeFreshtive2023",
    };

    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator
        .share(shareData)
        .then(() => console.log("Share was successful."));
    } else {
      console.log(`Your system doesn't support sharing files.`);
    }
  };

  //page ต่างๆ
  const elementPage = () => {
    switch (page) {
      case 0:
        return (
          <Box className="h-full p-10 flex flex-col justify-center items-center">
            <Image
              src={LOGO.src}
              alt="Nescafe"
              width={150}
              height={150}
              className="object-contain mb-5"
            />
            <Image
              src={TITLE.src}
              alt="Nescafe"
              width={500}
              height={500}
              className="object-contain reindeer "
            />
            <Button
              sx={{
                padding: "0 !important",
                marginTop: "30px",
              }}
              onClick={() => {
                nextPage();
              }}
            >
              <Image
                src={BTN_START.src}
                alt="Nescafe"
                width={256}
                height={256}
                className="object-contain h-24"
              />
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box className="h-full p-5 flex flex-col justify-between items-center ">
            <Wish
              handleChange={handleChange}
              user={user}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </Box>
        );
      case 2:
        return (
          <Box className="h-full p-5 flex flex-col justify-between ">
            <WishResult
              handleUpload={handleUpload}
              handleChange={handleChange}
              user={user}
              nextPage={nextPage}
              handleSubmitData={handleSubmitData}
              resetData={resetData}
              handleShare={handleShare}
              prevPage={prevPage}
              hadleShareIg={hadleShareIg}
            />
          </Box>
        );
      case 3:
        return (
          <Box className="h-full p-10 flex flex-col justify-center items-center ">
            <Image
              src={LOGO.src}
              alt="Nescafe"
              width={200}
              height={200}
              className="object-contain mb-5"
            />
            <Image
              src={TITLE.src}
              alt="Nescafe"
              width={500}
              height={500}
              className="object-contain reindeer "
            />
            <Image
              src={TEXT_THANK.src}
              alt="Nescafe"
              width={600}
              height={600}
              className="object-contain"
            />
          </Box>
        );
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["NIVEA"].join(","),
    },
  });
  return (
    <>
      {/* picture background */}
      <Canvas
        style={{
          height: "100dvh",
          backgroundImage: `url(${BG.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          overflowY: `${page == 3 ? "hidden" : "auto"}`,
          zIndex: "0",
        }}
      >
        <ambientLight intensity={5} />
        <directionalLight position={[2, 5, 2]} intensity={0} />
        <LeafEffect /> {/* ใส่บอลลูนที่นี่ */}
        {/* <Sparkles
          count={250}
          scale={[20, 20, 10]}
          size={10}
          speed={1}
          color={0xfffacd}
        /> */}
        <Html as="div" fullscreen>
          <ThemeProvider theme={theme}>
            <div className="h-full">
              <Container maxWidth="sm" className="h-full p-0 relative ">
                {elementPage()}
              </Container>
            </div>
          </ThemeProvider>
        </Html>
      </Canvas>
    </>
  );
}
