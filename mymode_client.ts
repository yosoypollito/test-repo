on('onClientGameTypeStart', () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer({
      x: 686.245,
      y: 577.950,
      z: 130.461,
      model: 'a_m_m_skater_01'
    }, () => {
      emit('chat:addMessage', {
        args: [
          'Hi, there!'
        ]
      })
    });
  });

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
});

RegisterCommand('gerogay', (source, args) => {
  let vehicleName = args[1] || "akuma";

  RequestModel(vehicleName);

  const playerPed = PlayerPedId()
  const [playerX, playerY, playerZ] = GetEntityCoords(playerPed);


  const vehicle = CreateVehicle(vehicleName, playerX, playerY, playerZ, GetEntityHeading(playerPed), true, true)

  SetPedIntoVehicle(playerPed, vehicle, -1)

  SetEntityAsNoLongerNeeded(vehicle)
  SetModelAsNoLongerNeeded(vehicleName)

  emit('chat:addMessage', {
    args: [
      'Spawned ' + vehicleName
    ]
  })
}, false)