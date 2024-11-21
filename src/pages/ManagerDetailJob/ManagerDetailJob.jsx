import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";

const ManagerDetailJob = () => {
  const [detailJob, setDetailJob] = useState([]);
  const param = useParams();

  useEffect(() => {
    congViecService
      .chiTietCongViec(param.id)
      .then((res) => {
        setDetailJob(res.data.content);
        console.log(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);


  return (
    <div>
      <img src={detailJob.hinhAnh} alt="" />
    </div>
  );
};

export default ManagerDetailJob;
