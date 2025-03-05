import GridData from "@/components/GridData";
import AppWrapper from "@/components/hoc/AppWrapper";
import httpRequest from "@/utils/httpRequest";
import {
  Box,
  Container,
  FormControl,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Swal from "sweetalert2";
export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [usersFilter, setUsersFilter] = useState([]);
  const router = useRouter();
  const initFilter = {
    show: "all",
    search: "",
    dateStart: "",
    dateEnd: dayjs(new Date()).format("YYYY-MM-DD"),
  };

  const [filter, setFilter] = useState(initFilter);

  const headerItem = [
    {
      headerName: "แสดง",
      header: "",
      field: "show",
      key: "show",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return (
          <StatusSwitch
            show={params.row.show}
            handleChangeShow={handleChangeShow}
            id={params.row.id}
          />
        );
      },
    },
    {
      headerName: "ลำดับ",
      header: "ลำดับ",
      field: "number",
      key: "number",
      width: 100,
      headerAlign: "center",
      align: "center",
    },

    {
      headerName: "ชื่อ",
      header: "ชื่อ",
      field: "firstName",
      key: "firstName",
      width: 150,
    },
    {
      headerName: "นามสกุล",
      header: "นามสกุล",
      field: "lastName",
      key: "lastName",
      width: 150,
    },
    {
      headerName: "ชื่อเล่น",
      header: "ชื่อเล่น",
      field: "nickName",
      key: "nickName",
      width: 100,
    },

    {
      headerName: "Email",
      header: "Email",
      field: "email",
      key: "email",
      width: 300,
    },
    {
      headerName: "เบอร์โทรศัพท์",
      header: "เบอร์โทรศัพท์",
      field: "phone",
      key: "phone",
      width: 150,
    },
    {
      headerName: "คำอวยพร",
      header: "คำอวยพร",
      field: "wish",
      key: "wish",
      width: 600,
      renderCell: (params) => {
        return (
          <Typography
          sx={{
            fontSize: "1.5rem !important",
          }}
            className="!text-wrap break-all !whitespace-normal"
          >
            {params.value}
          </Typography>
        );
      },
    },

    {
      headerName: "เวลาที่ลงทะเบียน",
      header: "เวลาที่ลงทะเบียน",
      field: "createdAt",
      key: "createdAt",
      width: 150,
    },
    {
      headerName: "รูปภาพ",
      header: "รูปภาพ",
      field: "photo",
      key: "photo",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            {params.value ? (
              <PhotoProvider>
                <Box className="flex flex-col justify-center items-center w-full">
                  <PhotoView src={params.value}>
                    <Image
                      width={100}
                      height={100}
                      src={params.value}
                      alt="img"
                      className="h-20 w-20 object-cover m-auto"
                    />
                  </PhotoView>
                </Box>
              </PhotoProvider>
            ) : null}
          </>
        );
      },
    },
  ];

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeShow = (e, id) => {
    let showValue = e.target.checked ? 0 : 1;
    Swal.fire({
      title: "คุณแน่ใจหรือไม่ ?",
      showCancelButton: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่ใช่",
      icon: "warning",
      showLoaderOnConfirm: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await httpRequest("put", `/user/${id}/show`, {
          show: showValue,
        });

        if (res.status == "error") {
          return Swal.fire({
            icon: "error",
            title: "เปลี่ยนไม่สำเร็จ",
            text: "กรุณาลองใหม่อีกครั้ง",
          });
        }

        Swal.fire({
          icon: "success",
          title: "เปลี่ยนสำเร็จ",
          showConfirmButton: false,
          timer: 1000,
        });

        const newUsers = usersFilter.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              show: showValue == 0 ? true : false,
            };
          }
          return item;
        });
        setUsersFilter(newUsers);

        const newUsers2 = users.map((item) => {
          if (item.id == id) {
            return {
              ...item,
              show: showValue == 0 ? true : false,
            };
          }
          return item;
        });
        setUsers(newUsers2);
      }
    });
  };

  const getUserAll = async () => {
    try {
      const res = await httpRequest("get", "/users");
      if (res.status == "error") return;
      const newData = res.data.map((item, index) => {
        return {
          ...item,
          number: index + 1,
          show: item.show == 1 ? false : true,
        };
      });
      setUsers(newData);
      setUsersFilter(newData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let data = users;
    if (filter.show !== "all") {
      data = data.filter((item) => item.show != filter.show);
    }
    if (filter.search) {
      data = data.filter((item) => {
        return (
          item.firstName.includes(filter.search) ||
          item.lastName.includes(filter.search) ||
          item.email.includes(filter.search) ||
          item.phone.includes(filter.search) ||
          item.wish.includes(filter.search)
        );
      });
    }
    if (filter.dateStart && filter.dateEnd) {
      data = data.filter((item) => {
        const dateStart = dayjs(filter.dateStart).format("YYYY-MM-DD");
        const dateEnd = dayjs(filter.dateEnd).format("YYYY-MM-DD");
        const dateItem = dayjs(item.createdAt).format("YYYY-MM-DD");
        return dateItem >= dateStart && dateItem <= dateEnd;
      });
    }

    const newData = data.map((item, index) => {
      return {
        ...item,
        number: index + 1,
      };
    }
    );

    setUsersFilter(newData);
  }, [filter]);

  useEffect(() => {
    const token = localStorage.getItem("NESTLE_admin");
    if (!token) {
      router.push("/sign-in");
      return;
    } else {
      getUserAll();
    }
  }, []);

  return (
    <AppWrapper>
      <Container maxWidth="xxl" className="py-10 flex flex-col gap-10">
        <Typography
          sx={{
            fontFamily: "Prompt",
            color: "#18529a !important",
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "3rem !important",
          }}
        >
          จำนวน {usersFilter?.length || 0} คน
        </Typography>

        <Box className="shadow-xl p-5 rounded-xl bg-white">
          <Typography
            sx={{
              fontWeight: "bold !important",
              textAlign: "center !important",
              color: "#18529a !important",
              fontSize: "2rem !important",
            }}
          >
            กรองข้อมูล
          </Typography>
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            <Box className="col-span-1">
              <Typography
                sx={{
                  fontSize: "1.5rem !important",
                }}
              >
                แสดงผล
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={filter.show}
                  name="show"
                  onChange={handleChangeFilter}
                  sx={{
                    fontSize: "1.5rem !important",
                  }}
                >
                  <MenuItem value={"all"}>ทั้งหมด</MenuItem>
                  <MenuItem value={0}>แสดง</MenuItem>
                  <MenuItem value={1}>ซ่อน</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className="col-span-2">
              <Typography
                sx={{
                  fontSize: "1.5rem !important",
                }}
              >
                ช่วงเวลา
              </Typography>

              <Box className="flex flex-row gap-3 justify-center items-center">
                <TextField
                  id="date-start"
                  variant="outlined"
                  type="date"
                  name="dateStart"
                  onChange={handleChangeFilter}
                  value={filter?.dateStart}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.5rem !important",
                    },
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "1.5rem !important",
                  }}
                >
                  -
                </Typography>
                <TextField
                  id="date-end"
                  variant="outlined"
                  type="date"
                  name="dateEnd"
                  onChange={handleChangeFilter}
                  value={filter?.dateEnd}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "1.5rem !important",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box className="col-span-1">
              <Typography
                sx={{
                  fontSize: "1.5rem !important",
                }}
              >
                ค้นหา
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="search"
                value={filter.search}
                onChange={handleChangeFilter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "1.5rem !important",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        <GridData headerItem={headerItem} users={usersFilter} />
      </Container>
    </AppWrapper>
  );
}

const StatusSwitch = ({ show, handleChangeShow, id }) => {
  return (
    <Switch checked={show || false} onChange={(e) => handleChangeShow(e, id)} />
  );
};
