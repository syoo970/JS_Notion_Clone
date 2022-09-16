// 데브코스 정책상 API END POINT는 삭제 조치 취하였습니다.
const API_END_POINT = "";

export const request = async (url, options = {}) => {
  try {
    const response = await fetch(API_END_POINT + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) return await response.json();
    throw new Error(response.statusText);
  } catch (e) {
    console.log(e);
  }
};
