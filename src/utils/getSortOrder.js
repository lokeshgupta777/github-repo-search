const getSortOrder = (sort = "") => {
  if (sort.match(/name/))
    return "asc"
  if (sort.match(/stars|updated|created/))
    return "desc"
  return "";
}

export default getSortOrder;