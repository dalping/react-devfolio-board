export const makeYYMMDD = date => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDay();
  const yymmdd = `${yyyy}년 ${mm}월 ${dd}일`;
  return yymmdd;
};