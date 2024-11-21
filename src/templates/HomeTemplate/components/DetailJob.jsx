import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { congViecService } from "../../../services/congViec.service";
import { Rate } from "antd";
 
const DetailJob = () => {
  const navigate = useNavigate();
  const [listDetailJob, setlistDetailJob] = useState([]);
  const param = useParams();
  useEffect(() => {
    congViecService
      .getCongViecTheoTen(param.slug)
      .then((res) => {
        setlistDetailJob(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.slug]);

  const StarRating = ({ numOfStars }) => {
    return <Rate disabled defaultValue={numOfStars} />;
  };

  const showDanhMucCongViec = () => {
    return (
      listDetailJob && (
        <div className="container  py-5">
          <div className="grid grid-cols-4 gap-4">
            {listDetailJob.map((item, index) => (
              <div
                key={index}
                
              >
                <img
                  src={item.congViec.hinhAnh}
                  alt=""
                  className="w-full h-40 object-cover mb-3 rounded-md"
                />

                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={item.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <h1 className="font-semibold text-base">
                    {item.tenNguoiTao}
                  </h1>
                </div>

                <p className="text-lg font-semibold mb-2">
                  {item.congViec.tenCongViec}
                </p>

                <div>
                  <StarRating numOfStars={item.congViec.saoCongViec} />
                </div>
                <button className="rounded-md w-40 h-12 bg-red-500 text-white" onClick={()=>{
                  navigate(`/detail/${param.slug}/${item.id}`);
                }}>Xem chi tiết</button>
              </div>
            ))}
          </div>
        </div>
      )
    );
  };

  return <div>{showDanhMucCongViec()}</div>;
};

export default DetailJob;
