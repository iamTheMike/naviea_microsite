import {
  BTN_BACK,
  BTN_CONTINUE,
  BTN_SHARE,
  CARD,
  POSTCARD_FB,
  POSTCARD_IG,
  SHARE_PIC,
 
} from "@/assets";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { toJpeg, toPng } from "html-to-image";
// import html2canvas from "html2canvas";
// import dynamic from "next/dynamic";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { BG_FRAME, LOGO2, PRODUCT, TEXT_BOT, TITLE } from "../../assets";
// import { RWebShare } from "react-web-share";
// import ReplayIcon from "@mui/icons-material/Replay";

export default function WishResult({
  user,
  prevPage,
  handleChange,
  handleSubmitData,
  resetData,
  handleShare,
  hadleShareIg,
  handleUpload,
}) {
  const boxRef = useRef(null);
  const boxRef2 = useRef(null);
  const [fontsize, setFontsize] = useState(null);

  const text = "";

  // const genarateImage = async () => {
  //   console.log("Genarate Photofile  Start", user);
  //   toPng(boxRef.current, {
  //     cacheBust: true,
  //     canvasWidth: 720,
  //     canvasHeight: 1280,
  //     width: 720,
  //     height: 1280,
  //     quality: 1,
  //     pixelRatio: 1,
  //   })
  //     .then(function (dataUrl) {
  //       //Get DataUrl is a base64
  //       var file = convert64toFile(dataUrl, `${user?.nickName}.png`);
  //       //create for user data

  //       const e = {
  //         target: {
  //           name: "photoFile",
  //           value: file,
  //         },
  //       };
  //       //set user data
  //       handleChange(e);
  //       console.log("Genarate PhotoFile  Finish", user);
  //     })
  //     .catch(function (error) {
  //       console.error("oops, something went wrong!", error);
  //     });
  // };

  const genarateImage2 = async () => {
    console.log("Genarate PhotoIGFile  Start", user);
    toPng(boxRef2.current, {
      cacheBust: true,
      canvasWidth: 720,
      canvasHeight: 720,
      width: 720,
      height: 720,
      quality: 1,
      pixelRatio: 1,
    })
      .then(function (dataUrl) {
        var file = convert64toFile(dataUrl, `${Date.now()}.png`);

        const e = {
          target: {
            name: "photoFileIg",
            value: file,
          },
        };
        handleChange(e);
        console.log("Genarate PhotoIGFile finish", user);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const generateShareUrl = async () => {
    console.log("Generate");
    if (user?.photoFileIg) {
      const url = await handleUpload(user?.photoFileIg);
      console.log("url", url);
      const e = {
        target: {
          name: "sharePhotoIg",
          value: url,
        },
      };
      handleChange(e);
    }
  };

  const convert64toFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    console.log("Convert64toFile");
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    console.log("UseEffect GeneratePhoto and GeneratePhotoIG Start");
    setTimeout(() => {
      // genarateImage();
      genarateImage2();
      console.log("UseEffect GeneratePhoto and GeneratePhotoIG count  ");
    }, 1000);
    console.log("UseEffect  GeneratePhoto and GeneratePhotoIG end", user);
  }, []);

  // useEffect(() => {
  //   console.log("UserEffect  for Photo start", user);
  //   if (!user?.photoFile) {
  //     console.log("No PhotoFile");
  //     return;
  //   }

  //   if (user?.wish.length < 100) {
  //     console.log("UserEffect  for Photo user?.wish.length < 100");
  //     if (user?.photoFile?.size < 20000) {
  //       console.log("UserEffect  for Photo user?.photoFile?.size < 950000");
  //       genarateImage();
  //       // if (user?.photoFile?.size < 950000) {
  //       //   console.log("UserEffect  for Photo user?.photoFile?.size < 950000")
  //       //   genarateImage();
  //     } else {
  //       const url = URL.createObjectURL(user?.photoFile);
  //       const event = {
  //         target: {
  //           name: "photo",
  //           value: url,
  //         },
  //       };
  //       console.log("UserEffect  for Photo  end", user);
  //       handleChange(event);
  //     }
  //   }

  //   if (user?.wish.length >= 100 && user?.wish.length < 200) {
  //     console.log("UserEffect  for Photo user?.wish.length < 200");
  //     if (user?.photoFile?.size < 980000) {
  //       console.log("UserEffect  for Photo user?.photoFile?.size < 980000");
  //       genarateImage();
  //     } else {
  //       const url = URL.createObjectURL(user?.photoFile);
  //       const event = {
  //         target: {
  //           name: "photo",
  //           value: url,
  //         },
  //       };
  //       handleChange(event);
  //       console.log("UserEffect  for Photo  end", user);
  //     }
  //   }

  //   if (user?.wish.length >= 200) {
  //     console.log("UserEffect  for Photo user?.wish.length >= 200");
  //     if (user?.photoFile?.size < 100000) {
  //       console.log("UserEffect  for Photo user?.photoFile?.size < 100000");
  //       genarateImage();
  //     } else {
  //       const url = URL.createObjectURL(user?.photoFile);
  //       const event = {
  //         target: {
  //           name: "photo",
  //           value: url,
  //         },
  //       };
  //       handleChange(event);
  //       console.log("UserEffect  for Photo  end", user);
  //     }
  //   }
  // }, [user?.photoFile, user?.wish]);

  useEffect(() => {
    console.log("UserEffect  for PhotoIg start ");
    if (!user?.photoFileIg) return;
    if (user?.wish.length < 100) {
      console.log("UserEffect  for PhotoIg user?.wish.length < 100");
      // if (user?.photoFileIg?.size < 160000) {
        if (user?.photoFileIg?.size < 150000) {
        console.log("UserEffect  for PhotoIg user?.wish.size < 440000");
        genarateImage2();
      } else {
        const url = URL.createObjectURL(user?.photoFileIg);
        generateShareUrl();
        const event = {
          target: {
            name: "photoIg",
            value: url,
          },
        };
        handleChange(event);
        console.log("UserEffect  for PhotoIG  end", user);
      }
    }
    if (user?.wish.length >= 100 && user?.wish.length < 200) {
      console.log("UserEffect  for PhotoIg user?.wish.length < 200");
      // if (user?.photoFileIg?.size < 170000) {
        if (user?.photoFileIg?.size < 155000) {
        console.log("UserEffect  for PhotoIg user?.wish.sixe < 460000");
        genarateImage2();
      } else {
        const url = URL.createObjectURL(user?.photoFileIg);
        generateShareUrl();
        const event = {
          target: {
            name: "photoIg",
            value: url,
          },
        };
        handleChange(event);
        console.log("UserEffect  for PhotoIG  end", user);
      }
    }
    if (user?.wish.length >= 200) {
      console.log("UserEffect  for PhotoIg user?.wish.length >= 200");
      // if (user?.photoFileIg?.size < 180000) {
        if (user?.photoFileIg?.size < 160000) {
        console.log("UserEffect  for PhotoIg user?.wish.size < 490000");
        genarateImage2();
      } else {
        const url = URL.createObjectURL(user?.photoFileIg);
        generateShareUrl();
        const event = {
          target: {
            name: "photoIg",
            value: url,
          },
        };
        handleChange(event);
        console.log("UserEffect  for PhotoIG  end", user);
      }
    }
  }, [user?.photoFileIg, user?.wish]);

  // useEffect(() => {
  //   if (text.length > 100) {
  //     setFontsize(32);
  //     // setFontsize(30);
  //   } else {
  //     setFontsize(40);
  //     // setFontsize(21);
  //   }
  // }, [text]);
  // useEffect(() => {
  //   if (user?.wish.length < 100) {
  //     setFontsize(55);
  //   } else {
  //     setFontsize(25);
  //   }
  // }, [user?.wish]);

  useEffect(() => {
    if (user?.wish.length > 100) {
      setFontsize(35);
      // setFontsize(30);
    } else {
      setFontsize(45);
      // setFontsize(21);
    }
  }, [user?.wish]);

  return (
    <Box className="flex flex-col   pb-20">
      {/* 720 * 720 */}
      <Box className="fixed bottom-[999rem]">
        {/* <Box className="fixed top-[100rem]" > */}
        <Box ref={boxRef2}>
          <div
            style={{
              backgroundImage: `url(${POSTCARD_IG.src})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "720px",
              height: "720px",
              position: "relative",
            }}
          >
            {/* show case */}
            <div className="absolute top-[150px] left-1/2 translate-x-[-50%] h-[330px]  w-[68%] flex justify-center items-center ">
              {/* <div className="absolute top-[250px] left-1/2 translate-x-[-50%] h-[330px]  w-[68%] flex justify-center items-center bg-red-300 "> */}
              {fontsize && (
                <Typography
                  sx={{
                    fontFamily: "NIVEA !important",
                    // fontFamily: "ScriptoramaMarkdownJF !important",
                    fontSize: `${fontsize}px !important`,
                    color: "#18529a !important",
                    width: "100% !important",
                    textAlign: "center !important",
                    lineHeight: "1.5 !important",
                    // lineHeight: "2 !important",
                    // backgroundColor : "red",
                  }}
                  className="break-words"
                >
                  {user.wish ? user.wish : text}
                </Typography>
              )}
            </div>
          </div>
        </Box>
      </Box>

      {user?.sharePhotoIg ? (
        <Box className="flex flex-col  justify-center items-center mt-5  ">
          <Image
            src={LOGO2.src}
            alt="Nescafe"
            width={200}
            height={200}
            className="object-contain"
          />

          <Box
            className="flex flex-col items-center justify-center relative   "
            sx={{}}
          >
            <Box className="top-[7px] left-2 relative items-center justify-center ">
              <Image
                src={TITLE.src}
                width={380}
                height={380}
                alt="text wish"
                className="  object-contain mt-3 reindeer  "
              />
            </Box>

            <Box className="flex flex-col z-50 items-center justify-center  ">
              <Image
                src={user?.sharePhotoIg}
                width={400}
                height={250}
                alt="wish"
                className="object-contain"
              />
            </Box>
          </Box>

          <Box className="flex flex-row w-full justify-around z-50 p-5 mt-5">
            <Button
              sx={{
                padding: "0 !important",
              }}
              // className={"text-[1.5rem] bg-blue-400 text-white m-2 px-5"}
              onClick={() => {
                handleChange({
                  target: {
                    name: "photoFile",
                    value: null,
                  },
                });

                handleChange({
                  target: {
                    name: "photo",
                    value: null,
                  },
                });

                handleChange({
                  target: {
                    name: "photoFileIg",
                    value: null,
                  },
                });

                handleChange({
                  target: {
                    name: "photoIg",
                    value: null,
                  },
                });

                prevPage();
              }}
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
              onClick={hadleShareIg}
              // className={"text-[1.5rem] bg-blue-400 text-white m-2 px-5"}
            >
              <Image
                src={BTN_SHARE.src}
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
              onClick={handleSubmitData}
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
              className="  w-50 object-contain z-[-1] "
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
      ) : (
        <>
          <Box className="flex flex-col items-center justify-center ">
            {/* <Image
              src={CARD.src}
              width={512}
              height={512}
              alt="wish"
              className="w-full h-auto object-contain opacity-0"
            /> */}

            <Typography
              sx={{
                fontFamily: "Prompt",
                color: "#fff !important",
                width: "100%",
                fontWeight: "bold",
                textAlign: "center",
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "1.5rem !important",
              }}
            >
              กรุณารอสักครู่...
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}
