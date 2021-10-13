const users = []

const addUser = ({ id, name, room }) => {
//이름의 공백 제거
  name = name.trim().toLowerCase()
  room = room.trim().toLowerCase()

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  )

  if (!name || !room) return { error: '사용자 이름과 방이 필요합니다.' }
  if (existingUser) return { error: '이미 사용중인 이름입니다.' }

  const user = { id, name, room }

  users.push(user)

  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom }