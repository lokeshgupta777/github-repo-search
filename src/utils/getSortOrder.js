const getSortOrder = (sort = "") => {
  if (sort.match(/name|author-date/))
    return "asc"
  if (sort.match(/stars|updated/))
    return "desc"
  return "";
}

export default getSortOrder;