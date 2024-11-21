import { http } from "./config"

export const congViecService = {
  getCongViecTheoTen: (keyword) => {
    return http.get(`/cong-viec/lay-danh-sach-cong-viec-theo-ten/${keyword}`);
  },
  CongViec: () => {
    return http.get(`/cong-viec`);
  },
  chiTietCongViec: (id) => {
    return http.get(`/chi-tiet-loai-cong-viec/${id}`);
  },
  layCongViecTheoChiTietLoai: (maChiTietLoai) =>{
    return http.get(`/cong-viec//lay-cong-viec-theo-chi-tiet-loai/${maChiTietLoai}`
    );
  }
};