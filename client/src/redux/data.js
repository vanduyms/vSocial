export const EditData = (data, id, post) => {
  const newData = data.map(item =>
    (item._id === id ? post : item)
  )
  return newData;
}