let users = []

const SocketServer = (socket) => {
  socket.on('joinUser', user => {
    users.push({ id: user._id, socketId: socket.id });
  });

  // socket.on('disconnect', () => {
  //   const data = users.find(user => user.socketId === socket.id)
  //   if (data) {
  //     const clients = users.filter(user =>
  //       data.followers.find(item => item._id === user.id)
  //     )

  //     if (clients.length > 0) {
  //       clients.forEach(client => {
  //         socket.to(`${client.socketId}`).emit('CheckUserOffline', data.id)
  //       })
  //     }
  //   }

  //   users = users.filter(user => user.socketId !== socket.id)
  // })

  socket.on('likePost', newPost => {
    const ids = [...newPost.user[0].followers, newPost.user[0]._id];
    const clients = users.filter(user => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('likeToClient', newPost);
      })
    }
  });

  socket.on('unLikePost', newPost => {
    const ids = [...newPost.user[0].followers, newPost.user[0]._id];
    const clients = users.filter(user => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach(client => {
        socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
      })
    }
  });

  socket.on('follow', info => {
    const user = users.find(user => user.id === info.newUser._id)
    user && socket.to(`${user.socketId}`).emit('followToClient', info)
  })

  socket.on('unfollow', info => {
    const user = users.find(user => user.id === info.newUser._id)
    user && socket.to(`${user.socketId}`).emit('unFollowToClient', info)
  })
};

module.exports = SocketServer;