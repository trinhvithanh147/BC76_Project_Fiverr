import React, { useEffect, useState } from "react";
import { congViecService } from "../../services/congViec.service";
import { Outlet, useNavigate } from "react-router-dom";

const ManagerJob = () => {
  const navigate = useNavigate();
  const [listCongViec, setListCongViec] = useState([]);

  useEffect(() => {
    congViecService
      .CongViec()
      .then((res) => {
        console.log(res);
        setListCongViec(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const DanhSachCongViec = () => {
    return (
      listCongViec &&
      listCongViec.map((item, index) => (
        <div className="space-y-3 text-center" key={index}>
          <img src={item.hinhAnh} alt="" className="w-full" />
          <h3 className="text-base">{item.tenCongViec}</h3>
          <button
            onClick={() => {
              navigate(`manager-detail-job/${item.id}`);
            }}
            className="bg-orange-400 rounded-md font-medium w-24 h-12 text-white"
          >
            Xem chi tiết
          </button>
        </div>
      ))
    );
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Danh sách công việc</h1>
      <div className="grid grid-cols-4 gap-5">{DanhSachCongViec()}</div>
    </div>
  );
};

export default ManagerJob;
