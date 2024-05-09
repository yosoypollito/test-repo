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

RegisterCommand('gerogay', async (source, args) => {
  let model = "adder";
  if (args.length > 0) {
    model = args[0].toString();
  }

  const hash = GetHashKey(model);
  if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash)) {
    emit('chat:addMessage', {
      args: [`It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`]
    });
    return;
  }

  RequestModel(hash);
  while (!HasModelLoaded(hash)) {
    await Delay(500);
  }

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