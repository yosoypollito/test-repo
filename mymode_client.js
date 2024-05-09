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

const Delay = (ms) => new Promise(res => setTimeout(res, ms));

RegisterCommand('gerogay', async (source, args) => {
  let model = "adder";
  if (args.length > 0) {
    model = args[0].toString();
  }

  // check if the model actually exists
  const hash = GetHashKey(model);
  if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash)) {
    emit('chat:addMessage', {
      args: [`It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`]
    });
    return;
  }

  // Request the model and wait until the game has loaded it
  RequestModel(hash);
  while (!HasModelLoaded(hash)) {
    await Delay(500);
  }

  const ped = PlayerPedId();

  // Get the coordinates of the player's Ped (their character)
  const coords = GetEntityCoords(ped);

  // Create a vehicle at the player's position
  const vehicle = CreateVehicle(hash, coords[0], coords[1], coords[2], GetEntityHeading(ped), true, false);

  // Set the player into the drivers seat of the vehicle
  SetPedIntoVehicle(ped, vehicle, -1);

  // Allow the game engine to clean up the vehicle and model if needed
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);

  // Tell the player the car spawned
  emit('chat:addMessage', {
    args: [`Woohoo! Enjoy your new ^*${model}!`]
  });
}, false)