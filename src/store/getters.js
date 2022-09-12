const getters = {
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  addedGoods: state => state.storageOut.addedGoods,
  masterId: state => state.storageOut.newBound.id,
  ownerId: state => state.storageOut.newBound.ownerId,
  areaId: state => state.storageOut.newBound.areaId
}
export default getters
